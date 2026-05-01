'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SECTION_STYLES: Record<string, { chip: string; text: string; label: string }> = {
  'Philosophy':   { chip: 'bg-blue-500',   text: 'text-white', label: 'PHILOSOPHY'   },
  'AI':           { chip: 'bg-red-500',    text: 'text-white', label: 'AI'           },
  'Hall of Fame': { chip: 'bg-yellow-500', text: 'text-black', label: 'HALL OF FAME' },
  'General':      { chip: 'bg-green-500',  text: 'text-white', label: 'GENERAL'      },
};

interface Post {
  title: string;
  author: string;
  date: string;
  readMin: number;
  section: string;
  excerpt: string;
  link: string;
  thumb: string | null;
}

const FALLBACK_POSTS: Post[] = [
  {
    title: 'How Open Source Teaches You to Write Code for People, Not Just Machines',
    author: 'Sujal Bhor',
    date: '2025-05-12',
    readMin: 5,
    section: 'Philosophy',
    excerpt: '"Programs must be written for people to read, and only incidentally for machines to execute." — Harold Abelson.',
    link: 'https://medium.com/fossible/how-open-source-teaches-you-to-write-code-for-people-not-just-machines-f43000c4bf34',
    thumb: null,
  },
  {
    title: 'Open Source Hygiene 101',
    author: 'Anish Dabhane',
    date: '2025-07-04',
    readMin: 4,
    section: 'General',
    excerpt: 'Keeping Your Repo Fresh, Secure, and Contribution-Friendly.',
    link: 'https://medium.com/fossible/open-source-hygiene-101-9322499425f7',
    thumb: null,
  },
  {
    title: 'The Truth About Open Source: It’s Free, But It’s Not Cheap',
    author: 'Avadhut Giri',
    date: '2025-06-26',
    readMin: 6,
    section: 'Philosophy',
    excerpt: "Open source is everywhere. It's in your code editor, your browser, your backend, and probably that weird side project you abandoned last summer.",
    link: 'https://medium.com/fossible/the-truth-about-open-source-its-free-but-it-s-not-cheap-21d4eb9e6633',
    thumb: null,
  },
  {
    title: "No LICENSE File? Why Your GitHub Project Isn't Really Open Source",
    author: 'Sujal Bhor',
    date: '2025-06-19',
    readMin: 7,
    section: 'General',
    excerpt: 'A friendly, no-jargon guide to understanding the most important concept in software collaboration.',
    link: 'https://medium.com/fossible/no-license-file-why-your-github-project-isnt-really-open-source-316b1dcde5d7',
    thumb: null,
  },
  {
    title: "Neha Narkhede's Journey: Open Source Innovation to Global Enterprise",
    author: 'Anish Dabhane',
    date: '2025-06-20',
    readMin: 5,
    section: 'Hall of Fame',
    excerpt: 'What if I told you that one of the most powerful tools used by Netflix, Uber and Spotify was co-created by a woman who started as an open-source contributor?',
    link: 'https://medium.com/fossible/neha-narkhedes-journey-open-source-innovation-to-global-enterprise-f7f07a85c9cb',
    thumb: null,
  },
  {
    title: '[Part 2] A2A+MCP: A Practical Guide to the Future of AI Agent Workflows',
    author: 'Anshul Kalbande',
    date: '2025-06-18',
    readMin: 12,
    section: 'AI',
    excerpt: 'AI agents are no longer working alone. A2A + MCP just rewired the future.',
    link: 'https://medium.com/fossible/part-2-a2a-mcp-a-practical-guide-to-the-future-of-ai-agent-workflows-7ab38a013f02',
    thumb: null,
  },
  {
    title: 'Automating HTTPS with Docker, Nginx & Certbot',
    author: 'Samir Wankhede',
    date: '2025-06-14',
    readMin: 7,
    section: 'General',
    excerpt: 'For any web-based project, whether it\'s a production deployment, a demo site, or even something temporary like a college event — HTTPS matters.',
    link: 'https://medium.com/fossible/automating-https-with-docker-nginx-certbot-c4c406409f32',
    thumb: null,
  },
  {
    title: 'Why Vulkan Is Better (But You Might Want OpenGL Anyway)',
    author: 'Kshitij Aucharmal',
    date: '2025-06-08',
    readMin: 5,
    section: 'General',
    excerpt: 'Starting out making a game engine or a simulation engine from any Graphics API like Vulkan and OpenGL is a nightmare.',
    link: 'https://medium.com/fossible/why-vulkan-is-better-but-you-might-want-opengl-anyway-f797cf9cfaea',
    thumb: null,
  },
  {
    title: '[Part 1] A2A + MCP: A Practical Guide to the Future of AI Agent Workflows',
    author: 'Anurag Mandke',
    date: '2025-05-13',
    readMin: 10,
    section: 'AI',
    excerpt: 'Both part 1 and part 2 of this series are the joint efforts of Anurag Mandke and Anshul Kalbande.',
    link: 'https://medium.com/fossible/part-1-a2a-mcp-a-practical-guide-to-the-future-of-ai-agent-workflows-f8052aa6e126',
    thumb: null,
  },
];

function fmtDate(d: string) {
  try {
    return new Date(d)
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
  } catch {
    return d;
  }
}

function classifySection(categories: string[]) {
  const cats = categories.map((c) => c.toLowerCase());
  if (cats.some((c) => c.includes('philosoph'))) return 'Philosophy';
  if (cats.some((c) => c.includes('hall of fame') || c.includes('halloffame'))) return 'Hall of Fame';
  if (cats.some((c) => c.includes('ai') || c.includes('ml') || c.includes('llm') || c.includes('artificial')))
    return 'AI';
  return 'General';
}

function extractExcerpt(html: string) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const txt = (tmp.textContent ?? '').replace(/\s+/g, ' ').trim();
  return txt.slice(0, 180) + (txt.length > 180 ? '…' : '');
}

function PlaceholderThumb({ section, title }: { section: string; idx: number; title: string }) {
  const s = SECTION_STYLES[section] ?? SECTION_STYLES['General'];
  return (
    <div className={`absolute inset-0 ${s.chip} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 opacity-30 grid-bg" />
      <div className={`relative z-10 px-6 font-mono font-bold text-center leading-tight ${s.text} text-lg`}>
        {title}
      </div>
      <div className="absolute top-3 left-3 w-3 h-3 bg-black" />
      <div className="absolute top-3 right-3 w-3 h-3 bg-black" />
      <div className="absolute bottom-3 left-3 w-3 h-3 bg-black" />
      <div className="absolute bottom-3 right-3 w-3 h-3 bg-black" />
    </div>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  const s = SECTION_STYLES[post.section] ?? SECTION_STYLES['General'];
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white dark:bg-gray-800 pixelated-border overflow-hidden mb-10 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px] bg-gray-200 dark:bg-gray-700 border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-hidden">
          {post.thumb ? (
            <img
              src={post.thumb}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <PlaceholderThumb section={post.section} idx={0} title={post.title} />
          )}
          <div className={`absolute top-4 left-4 ${s.chip} ${s.text} font-mono text-[10px] font-bold tracking-widest px-2 py-1 pixelated-border`}>
            FEATURED · {s.label}
          </div>
        </div>
        {/* Body */}
        <div className="p-6 lg:p-10 flex flex-col">
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-3">
            {fmtDate(post.date)} · {post.readMin} MIN READ
          </div>
          {post.excerpt && (
            <p className="font-mono text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto flex items-center justify-between">
            <div className="font-mono text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-black dark:bg-white" />
              {post.author}
            </div>
            <span className="bg-black text-white font-mono text-xs font-bold px-3 py-2 pixelated-border group-hover:bg-yellow-500 group-hover:text-black transition-colors">
              READ →
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function PostCard({ post, idx }: { post: Post; idx: number }) {
  const s = SECTION_STYLES[post.section] ?? SECTION_STYLES['General'];
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden border-b-4 border-black">
        {post.thumb ? (
          <img
            src={post.thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <PlaceholderThumb section={post.section} idx={idx} title={post.title} />
        )}
        <div className={`absolute top-3 left-3 ${s.chip} ${s.text} font-mono text-[10px] font-bold tracking-widest px-2 py-1 pixelated-border`}>
          {s.label}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/85 text-white font-mono text-xs font-bold px-2 py-1">
          {post.readMin} MIN
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-2">
          {fmtDate(post.date)}
        </div>
        {post.excerpt && (
          <p className="font-mono text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="font-mono text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 bg-black dark:bg-white shrink-0" />
            <span className="truncate">{post.author}</span>
          </div>
          <span className="font-mono text-xs font-bold text-black dark:text-white group-hover:text-yellow-600 shrink-0">
            READ →
          </span>
        </div>
      </div>
    </a>
  );
}

export default function BlogsPage() {
  const [posts] = useState<Post[]>(FALLBACK_POSTS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const sections = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.section)))],
    [posts]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchSec = activeFilter === 'All' || p.section === activeFilter;
      const haystack = `${p.title} ${p.author} ${p.excerpt} ${p.section}`.toLowerCase();
      return matchSec && (!q || haystack.includes(q));
    });
  }, [posts, activeFilter, search]);

  const showFeatured = activeFilter === 'All' && !search.trim() && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const gridPosts = showFeatured ? filtered.slice(1) : filtered;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg"
      >
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-blue-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-yellow-600 dark:text-yellow-400">
              [PUBLICATION]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {posts.length} POSTS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            THE{' '}
            <span className="inline-block bg-yellow-500 text-black px-3 py-1 pixelated-border ml-1">
              FOSSible
            </span>
            <br />
            BLOG
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-8">
            Every blog written and published by PICT OSS Community members — spanning AI, Open Source Philosophy, and more — all under{' '}
            <a
              href="https://medium.com/fossible"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-yellow-500 decoration-4 underline-offset-4 font-bold"
            >
              FOSSible
            </a>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://medium.com/fossible"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.846 6.887c.03-.295-.083-.586-.303-.784l-2.24-2.7v-.403h6.958l5.378 11.795 4.728-11.795H24v.403l-1.916 1.837c-.165.126-.247.333-.213.538v13.498c-.034.204.048.411.213.537l1.871 1.837v.403h-9.412v-.403l1.939-1.882c.19-.19.19-.246.19-.537V7.794L11.227 21.65h-.722L4.768 7.794v9.282c-.052.385.076.774.347 1.052l2.521 3.058v.404H.5v-.404l2.521-3.058c.27-.279.39-.67.325-1.052V6.887z" />
              </svg>
              FOLLOW ON MEDIUM
            </a>
            <a
              href="#posts"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              BROWSE POSTS ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Rail ── */}
      <section className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b-4 border-black dark:border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-300 tracking-widest hidden sm:inline">
              SECTION:
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1 py-1">
              {sections.map((sec) => {
                const isActive = activeFilter === sec;
                const style =
                  sec === 'All'
                    ? isActive
                      ? 'bg-black text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                    : isActive
                    ? `${SECTION_STYLES[sec]?.chip ?? 'bg-gray-500'} ${SECTION_STYLES[sec]?.text ?? 'text-white'}`
                    : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:opacity-80';
                return (
                  <button
                    key={sec}
                    onClick={() => setActiveFilter(sec)}
                    className={`relative shrink-0 ${style} font-mono text-xs font-bold tracking-wider px-3 py-2 pixelated-border hover:scale-105 transition-all`}
                  >
                    {sec.toUpperCase()}
                    {isActive && (
                      <span className="absolute left-1.5 right-1.5 -bottom-1.5 h-1 bg-current" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto hidden md:flex items-center gap-2">
              <input
                type="search"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono text-sm bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 pixelated-border w-56 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Posts ── */}
      <main id="posts" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-block bg-yellow-500 text-black px-4 py-3 font-mono font-bold pixelated-border mb-4">
                NO POSTS FOUND
              </div>
              <p className="font-mono text-gray-600 dark:text-gray-300">
                Try a different section or clear your search.
              </p>
            </div>
          ) : (
            <>
              {featured && <FeaturedCard post={featured} />}

              <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-300 mb-6 flex items-center gap-2 before:inline-block before:w-3.5 before:h-3.5 before:bg-current">
                ALL POSTS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {gridPosts.map((post, i) => (
                  <PostCard key={post.link + i} post={post} idx={i + (showFeatured ? 1 : 0)} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── Editors strip ── */}
      <section className="bg-white dark:bg-gray-800 border-t-4 border-black dark:border-gray-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
              [EDITORS]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'ANISH DABHANE',    color: 'bg-red-500 text-white'    },
              { name: 'KSHITIJ AUCHARMAL', color: 'bg-blue-500 text-white'   },
              { name: 'ANSHUL KALBANDE',  color: 'bg-yellow-500 text-black' },
              { name: 'ANURAG MANDKE',    color: 'bg-green-500 text-white'  },
              { name: 'AVADHUT GIRI',     color: 'bg-red-500 text-white'    },
              { name: 'SUJAL BHOR',       color: 'bg-blue-500 text-white'   },
              { name: 'SAMIR WANKHEDE',   color: 'bg-yellow-500 text-black' },
              { name: '+ MORE',           color: 'bg-black text-white'      },
            ].map(({ name, color }) => (
              <span key={name} className={`${color} font-mono text-sm font-bold px-3 py-2 pixelated-border`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
