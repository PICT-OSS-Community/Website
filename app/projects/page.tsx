'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CATEGORY_STYLES: Record<string, { chip: string; text: string; label: string }> = {
  'AI':       { chip: 'bg-red-500',    text: 'text-white', label: 'AI'       },
  'Systems':  { chip: 'bg-blue-500',   text: 'text-white', label: 'SYSTEMS'  },
  'Security': { chip: 'bg-yellow-500', text: 'text-black', label: 'SECURITY' },
  'Desktop':  { chip: 'bg-green-500',  text: 'text-white', label: 'DESKTOP'  },
};

interface Project {
  name: string;
  description: string;
  author: string;
  authorUrl: string;
  githubUrl: string;
  tags: string[];
  category: string;
}

const PROJECTS: Project[] = [
  {
    name: 'AutoCommitt',
    description: 'AI-powered CLI tool to generate commit messages locally using Ollama — no API keys, no cloud, just fast and private commits.',
    author: 'Spartan-71',
    authorUrl: 'https://github.com/Spartan-71',
    githubUrl: 'https://github.com/Spartan-71/AutoCommitt',
    tags: ['Python', 'Ollama', 'CLI', 'AI'],
    category: 'AI',
  },
  {
    name: 'WebGenie',
    description: 'Open-source browser agent that operates as a Chrome extension, letting AI autonomously navigate and interact with web pages.',
    author: 'derpx06',
    authorUrl: 'https://github.com/derpx06',
    githubUrl: 'https://github.com/derpx06/webgenie',
    tags: ['LangChain', 'Chromium API', 'DOM', 'AI'],
    category: 'AI',
  },
  {
    name: 'VIREX',
    description: 'Platform-independent virtual machine with an open and readable intermediate language (SASM), inspired by the JVM.',
    author: 'Soham-Metha',
    authorUrl: 'https://github.com/Soham-Metha',
    githubUrl: 'https://github.com/Soham-Metha/virex',
    tags: ['C', 'Make', 'Graphviz', 'VM'],
    category: 'Systems',
  },
  {
    name: 'Termion',
    description: 'Lightweight terminal emulator built in Rust using egui for a graphical interface — fast, minimal, and hackable.',
    author: 'Omkar-Wagholikar',
    authorUrl: 'https://github.com/Omkar-Wagholikar',
    githubUrl: 'https://github.com/Omkar-Wagholikar/Termion',
    tags: ['Rust', 'egui', 'Terminal', 'GUI'],
    category: 'Systems',
  },
  {
    name: 'TorCommander',
    description: 'Lightweight Linux tool that anonymizes terminal commands by routing them through the Tor network via SOCKS4 proxying.',
    author: 'ArfatKadvekar',
    authorUrl: 'https://github.com/ArfatKadvekar',
    githubUrl: 'https://github.com/ArfatKadvekar/TorCommander',
    tags: ['C', 'SOCKS4', 'Make', 'Tor'],
    category: 'Security',
  },
  {
    name: 'ShieldOS',
    description: 'User-friendly Linux hardening audit tool that identifies system vulnerabilities and security weaknesses with clear remediation guidance.',
    author: 'Suyashp10',
    authorUrl: 'https://github.com/Suyashp10',
    githubUrl: 'https://github.com/Suyashp10/ShieldOS',
    tags: ['Python', 'HTML', 'Shell', 'Linux'],
    category: 'Security',
  },
  {
    name: 'Cube Timer',
    description: 'A 3×3 Rubik\'s Cube timer app for the GNOME desktop, built with Libadwaita for a native, polished experience.',
    author: 'vallabhvidy',
    authorUrl: 'https://github.com/vallabhvidy',
    githubUrl: 'https://github.com/vallabhvidy/CubeTimer',
    tags: ['Libadwaita', 'GNOME', 'GTK', 'Desktop'],
    category: 'Desktop',
  },
];

const GITHUB_ICON = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

function ProjectCard({ project }: { project: Project }) {
  const s = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES['Systems'];
  return (
    <div className="group bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1">

      {/* Category header band */}
      <div className={`${s.chip} border-b-4 border-black px-4 py-3 flex items-center justify-between`}>
        <span className={`font-mono text-[10px] font-bold tracking-[0.2em] ${s.text}`}>
          {s.label}
        </span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-black/25" />
          <div className="w-2.5 h-2.5 bg-black/25" />
          <div className="w-2.5 h-2.5 bg-black/25" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-mono font-bold text-black dark:text-white text-xl mb-3 leading-tight">
          {project.name}
        </h3>
        <p className="font-mono text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] font-bold tracking-wider bg-gray-100 dark:bg-gray-700 text-black dark:text-white px-2 py-1 pixelated-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t-2 border-dashed border-gray-200 dark:border-gray-600">
          <a
            href={project.authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 truncate hover:text-black dark:hover:text-white transition-colors"
          >
            <span className="inline-block w-2 h-2 bg-black dark:bg-white shrink-0" />
            <span className="truncate">@{project.author}</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 ${s.chip} ${s.text} font-mono text-xs font-bold px-3 py-2 pixelated-border flex items-center gap-1.5 hover:opacity-90 transition-opacity`}
          >
            {GITHUB_ICON}
            VIEW →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchCat = activeFilter === 'All' || p.category === activeFilter;
      const haystack = `${p.name} ${p.author} ${p.description} ${p.tags.join(' ')} ${p.category}`.toLowerCase();
      return matchCat && (!q || haystack.includes(q));
    });
  }, [activeFilter, search]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* ── Hero ── */}
      <section className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg">
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-green-500', 'bg-red-500', 'bg-blue-500', 'bg-yellow-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-green-600 dark:text-green-400">
              [COMMUNITY PROJECTS]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {PROJECTS.length} PROJECTS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            AWESOME{' '}
            <span className="inline-block bg-green-500 text-white px-3 py-1 pixelated-border">
              PROJECTS
            </span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-8">
            A curated showcase of open source projects built and maintained by PICT OSS Community members — from AI tools to systems programming.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/PICT-OSS-Community/awesome-pict-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              VIEW ON GITHUB
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              BROWSE PROJECTS ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Rail ── */}
      <section className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b-4 border-black dark:border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-300 tracking-widest hidden sm:inline">
              CATEGORY:
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1 py-1">
              {categories.map((cat) => {
                const isActive = activeFilter === cat;
                const style =
                  cat === 'All'
                    ? isActive
                      ? 'bg-black text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                    : isActive
                    ? `${CATEGORY_STYLES[cat]?.chip ?? 'bg-gray-500'} ${CATEGORY_STYLES[cat]?.text ?? 'text-white'}`
                    : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:opacity-80';
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`relative shrink-0 ${style} font-mono text-xs font-bold tracking-wider px-3 py-2 pixelated-border hover:scale-105 transition-all`}
                  >
                    {cat.toUpperCase()}
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
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono text-sm bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 pixelated-border w-56 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects Grid ── */}
      <main id="projects" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-block bg-green-500 text-white px-4 py-3 font-mono font-bold pixelated-border mb-4">
                NO PROJECTS FOUND
              </div>
              <p className="font-mono text-gray-600 dark:text-gray-300">
                Try a different category or clear your search.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-300 mb-6 flex items-center gap-2 before:inline-block before:w-3.5 before:h-3.5 before:bg-current">
                ALL PROJECTS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filtered.map((project) => (
                  <ProjectCard key={project.githubUrl} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* ── Submit CTA ── */}
      <section className="bg-white dark:bg-gray-800 border-t-4 border-black dark:border-gray-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-green-600 dark:text-green-400">
              [SUBMIT YOUR PROJECT]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="font-mono text-sm text-gray-700 dark:text-gray-200 max-w-xl leading-relaxed">
              Built something awesome? Open a pull request on the{' '}
              <a
                href="https://github.com/PICT-OSS-Community/awesome-pict-oss"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-green-500 decoration-4 underline-offset-4 font-bold"
              >
                awesome-pict-oss
              </a>{' '}
              repo to get your project listed here.
            </p>
            <a
              href="https://github.com/PICT-OSS-Community/awesome-pict-oss"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              ADD YOUR PROJECT →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
