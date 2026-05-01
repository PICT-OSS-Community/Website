import EventsClient, { type Session } from './EventsClient';
import { getLatestYoutubeVideosByChannelId, getYoutubeChannelIdFromHandle } from './youtube';

function categorize(title: string) {
  const t = title.toLowerCase();
  if (t.includes('hackathon') || t.includes('build-a-thon') || t.includes('buildathon') || t.includes('hacktoberfest'))
    return 'Hackathon';
  if (t.includes('panel')) return 'Panel';
  if (t.includes('workshop') || t.includes('hands-on')) return 'Workshop';
  if (t.includes('tutorial') || t.includes('demo') || t.includes('walkthrough')) return 'Tutorial';
  return 'Talk';
}

function tagsFromTitle(title: string) {
  const lower = title.toLowerCase();
  const tags: string[] = [];
  const push = (t: string) => {
    if (!tags.includes(t)) tags.push(t);
  };

  if (lower.includes('open source') || lower.includes('opensource') || lower.includes('oss')) push('oss');
  if (lower.includes('git')) push('git');
  if (lower.includes('github')) push('github');
  if (lower.includes('linux')) push('linux');
  if (lower.includes('docker')) push('docker');
  if (lower.includes('kubernetes') || lower.includes('k8s')) push('k8s');
  if (lower.includes('react')) push('react');
  if (lower.includes('next')) push('nextjs');
  if (lower.includes('web')) push('web');
  if (lower.includes('cloud')) push('cloud');
  if (lower.includes('hacktoberfest')) push('hacktoberfest');
  if (lower.includes('workshop')) push('workshop');

  if (tags.length === 0) tags.push('session');
  return tags.slice(0, 6);
}

function normalizeTitle(s: string) {
  return s
    .toLowerCase()
    .replaceAll('&', 'and')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleMatchScore(sessionTitle: string, videoTitle: string) {
  const a = normalizeTitle(sessionTitle);
  const b = normalizeTitle(videoTitle);
  if (!a || !b) return 0;
  if (a === b) return 1000;
  if (b.includes(a)) return 900 + Math.min(50, a.length);

  const aTokens = a.split(' ').filter((t) => t.length >= 4);
  if (aTokens.length === 0) return 0;
  let hit = 0;
  for (const t of aTokens) if (b.includes(t)) hit += 1;
  return hit * 10;
}

function attachYoutubeRecordings(seriesSessions: Session[], youtubeSessions: Session[]) {
  const unused = [...youtubeSessions];
  const attached: Session[] = seriesSessions.map((s) => ({ ...s }));

  for (const s of attached) {
    // Only attach to sessions that don't already have a real video id.
    if (s.id && !s.id.startsWith('PLACEHOLDER_')) continue;

    let bestIdx = -1;
    let bestScore = 0;
    for (let i = 0; i < unused.length; i++) {
      const u = unused[i]!;
      const score = titleMatchScore(s.title, u.title);
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }

    // Conservative threshold to avoid incorrect attachments.
    if (bestIdx !== -1 && bestScore >= 30) {
      const matched = unused.splice(bestIdx, 1)[0]!;
      s.id = matched.id; // use real YouTube video id so thumbnail/embed works
    }
  }

  return { attached, remainingYoutube: unused };
}

function toSession(v: { id: string; title: string; published: string }) : Session {
  return {
    id: v.id,
    title: v.title,
    speaker: 'PICT OSS Community',
    date: v.published,
    category: categorize(v.title),
    tags: tagsFromTitle(v.title),
    series: 'Guest Sessions',
  };
}

export default async function EventsPage() {
  try {
    const channelId = await getYoutubeChannelIdFromHandle('PICT-OSS-Community');
    const videos = await getLatestYoutubeVideosByChannelId(channelId, 30);
    const youtubeSessions = videos.map(toSession);
    const hackThisSummer: Session[] = [
      {
        id: 'PLACEHOLDER_HTS_01',
        series: 'Hack This Summer',
        title: "Neovim 101 — Why Real Devs Don't Touch the Mouse",
        speaker: 'Kshitij Aucharmal',
        date: '2025-06-16',
        time: '9:00pm-10:00pm',
        category: 'Tutorial',
        tags: ['neovim', 'vim', 'tools'],
      },
      {
        id: 'PLACEHOLDER_HTS_02',
        series: 'Hack This Summer',
        title: 'Your Linux Launchpad — From Zero to Installed',
        speaker: 'Vedant Jadhav',
        date: '2025-06-20',
        time: '9:00pm-10:00pm',
        category: 'Talk',
        tags: ['linux', 'beginner'],
      },
      {
        id: 'PLACEHOLDER_HTS_03',
        series: 'Hack This Summer',
        title: 'Open Source Contributions 101 — A Starter Session',
        speaker: 'Sujal Bhor',
        date: '2025-06-24',
        time: '9:00pm-10:00pm',
        category: 'Talk',
        tags: ['oss', 'github', 'beginner'],
      },
      {
        id: 'PLACEHOLDER_HTS_04',
        series: 'Hack This Summer',
        title: 'Hack the Issue — Live OSS Website Bug Fix Session',
        speaker: 'Chirag Dave • Anshul Kalbande',
        date: '2025-06-27',
        time: '9:00pm-10:00pm',
        category: 'Workshop',
        tags: ['oss', 'bugfix', 'hands-on'],
      },
      {
        id: 'PLACEHOLDER_HTS_05',
        series: 'Hack This Summer',
        title: 'Open Source Programs — Unlock the World of Open Source Programs',
        speaker: 'Anish Dabhane',
        date: '2025-07-04',
        time: '9:00pm-10:00pm',
        category: 'Talk',
        tags: ['programs', 'oss', 'lfx'],
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const openSourceTalks: Session[] = [
      {
        id: 'PLACEHOLDER_OST_01',
        series: 'Open Source Talks',
        title: 'Perks of preparing for GSOC',
        speaker: 'Atharv Fakatkar',
        date: '2025-01-25',
        time: '9:30pm-10:30pm',
        category: 'Talk',
        tags: ['gsoc', 'oss'],
      },
      {
        id: 'PLACEHOLDER_OST_02',
        series: 'Open Source Talks',
        title: 'How to make your First Contribution to OpenSource?',
        speaker: 'Kshitij Aucharmal',
        date: '2025-02-01',
        time: '9:30pm-10:30pm',
        category: 'Talk',
        tags: ['oss', 'beginner', 'github'],
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const openSourceChronicles: Session[] = [
      {
        id: 'PLACEHOLDER_OSC_01',
        series: 'OpenSource Chronicles',
        title: 'How to build your own DNS Server?',
        speaker: 'Shardul Nalegave',
        date: '2025-01-18',
        time: '9:30pm-10:30pm',
        category: 'Tutorial',
        tags: ['dns', 'networking', 'systems'],
      },
      {
        id: 'PLACEHOLDER_OSC_02',
        series: 'OpenSource Chronicles',
        title: 'How to build your own Python Package?',
        speaker: 'Anish Dabhane',
        date: '2025-01-23',
        time: '9:30pm-10:30pm',
        category: 'Tutorial',
        tags: ['python', 'packaging', 'pypi'],
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const seniorSessions: Session[] = [
      {
        id: 'PLACEHOLDER_SS_01',
        series: 'Seniors Session',
        title: 'How I Landed a Full-Time Offer at Google',
        speaker: 'Aarya Bhave',
        date: '2025-11-21',
        time: '6:00pm-7:00pm',
        category: 'Talk',
        tags: ['career', 'google', 'internship'],
      },
      {
        id: 'PLACEHOLDER_SS_02',
        series: 'Seniors Session',
        title: 'Cracking Adobe: From Intern to Full-Time',
        speaker: 'Shubham Shinde',
        date: '2025-12-24',
        time: '6:00pm-7:00pm',
        category: 'Talk',
        tags: ['career', 'adobe', 'internship'],
      },
      {
        id: 'PLACEHOLDER_SS_03',
        series: 'Seniors Session',
        title: 'Beyond CP: An Unconventional Path to PhonePe',
        speaker: 'Soham Yedgaonkar',
        date: '2026-01-03',
        time: '6:00pm-7:00pm',
        category: 'Talk',
        tags: ['career', 'phonepe', 'growth'],
      },
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const htsAttach = attachYoutubeRecordings(hackThisSummer, youtubeSessions);
    const seniorsAttach = attachYoutubeRecordings(seniorSessions, htsAttach.remainingYoutube);
    const ostAttach = attachYoutubeRecordings(openSourceTalks, seniorsAttach.remainingYoutube);
    const oscAttach = attachYoutubeRecordings(openSourceChronicles, ostAttach.remainingYoutube);

    const sessions = [
      ...oscAttach.attached,
      ...ostAttach.attached,
      ...seniorsAttach.attached,
      ...htsAttach.attached,
      ...oscAttach.remainingYoutube, // still show the rest under "YouTube Recordings"
    ];
    return <EventsClient sessions={sessions} />;
  } catch {
    return <EventsClient sessions={[]} />;
  }
}
