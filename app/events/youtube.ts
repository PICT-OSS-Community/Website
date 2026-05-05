export interface YoutubeFeedVideo {
  id: string;
  title: string;
  published: string;
  url: string;
}

function decodeXmlEntities(s: string) {
  return s
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'");
}

function textBetween(haystack: string, startTag: string, endTag: string) {
  const start = haystack.indexOf(startTag);
  if (start === -1) return null;
  const from = start + startTag.length;
  const end = haystack.indexOf(endTag, from);
  if (end === -1) return null;
  return haystack.slice(from, end);
}

export async function getYoutubeChannelIdFromHandle(handle: string) {
  const url = `https://www.youtube.com/@${handle}`;
  const res = await fetch(url, {
    // Helps ensure consistent HTML in some deployments.
    headers: { 'user-agent': 'Mozilla/5.0 (compatible; OSS-Community-Website/1.0)' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to load channel page (${res.status})`);
  const html = await res.text();

  // YouTube embeds the channel id in initial JSON as either channelId or browseId.
  const m =
    html.match(/"channelId":"(UC[a-zA-Z0-9_-]{20,})"/) ??
    html.match(/"browseId":"(UC[a-zA-Z0-9_-]{20,})"/);

  if (!m?.[1]) throw new Error('Could not find channel id in channel page HTML');
  return m[1];
}

export async function getLatestYoutubeVideosByChannelId(channelId: string, limit = 24) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  const res = await fetch(feedUrl, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load YouTube feed (${res.status})`);
  const xml = await res.text();

  const entries = xml.split('<entry>').slice(1);
  const items: YoutubeFeedVideo[] = [];

  for (const chunk of entries) {
    const entry = chunk.split('</entry>')[0] ?? '';
    const id = textBetween(entry, '<yt:videoId>', '</yt:videoId>');
    const rawTitle = textBetween(entry, '<title>', '</title>');
    const published = textBetween(entry, '<published>', '</published>');
    const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1] ?? null;
    if (!id || !rawTitle || !published) continue;

    items.push({
      id: decodeXmlEntities(id.trim()),
      title: decodeXmlEntities(rawTitle.trim()),
      published: decodeXmlEntities(published.trim()),
      url: decodeXmlEntities((link ?? `https://www.youtube.com/watch?v=${id}`).trim()),
    });

    if (items.length >= limit) break;
  }

  return items;
}

