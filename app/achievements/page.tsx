'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PROGRAM_STYLES: Record<string, { chip: string; text: string; label: string }> = {
  'GSoC':      { chip: 'bg-red-500',    text: 'text-white', label: 'GSoC'      },
  'LFX':       { chip: 'bg-blue-500',   text: 'text-white', label: 'LFX'       },
  'Apertre':   { chip: 'bg-yellow-500', text: 'text-black', label: 'APERTRE'   },
  'GSSoC':     { chip: 'bg-green-500',  text: 'text-white', label: 'GSSoC'     },
  'MLH':       { chip: 'bg-blue-500',   text: 'text-white', label: 'MLH'       },
  'Outreachy': { chip: 'bg-red-500',    text: 'text-white', label: 'OUTREACHY' },
};

interface Achiever {
  name: string;
  program: string;
  org: string;
  year: number;
  project: string;
  role?: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    site?: string;
  };
}

/* ── Add or update entries here ───────────────────────────────────────────── */
const ACHIEVERS: Achiever[] = [
  { name: 'Soham Metha',     program: 'LFX',     org: 'The Linux Foundation',            year: 2025, project: 'LFX Mentorship 2025',        role: 'Mentee'              },
  { name: 'Anish Dabhane',   program: 'LFX',     org: 'The Linux Foundation',            year: 2025, project: 'LFX Mentorship 2025',        role: 'Mentee',             links: { github: 'https://github.com/Spartan-71', linkedin: 'https://www.linkedin.com/in/anish-dabhane-0669781b5' } },
  { name: 'Sujal Bhor',      program: 'GSoC',    org: 'The Linux Foundation',            year: 2025, project: 'Google Summer of Code 2025', role: 'Contributor',        links: { github: 'https://github.com/bhorsujal', linkedin: 'https://linkedin.com/in/sujal-bhor' } },
  { name: 'Soham Mehta',     program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Project Admin'      },
  { name: 'Anish Dabhane',   program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Campus Ambassador',  links: { github: 'https://github.com/Spartan-71', linkedin: 'https://www.linkedin.com/in/anish-dabhane-0669781b5' } },
  { name: 'Farkhanda Dalal', program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Rank 71',           links: { github: 'https://github.com/Farkhanda-Dalal', linkedin: 'https://www.linkedin.com/in/farkhanda-dalal/' } },
  { name: 'Renuka Bhavsar',  program: 'Apertre', org: 'Resourcio Community',             year: 2026, project: 'Apertre 3.0',               role: 'Top 50 Contributors'   },
  { name: 'PICT OSS Community', program: 'Apertre', org: 'Resourcio Community',          year: 2026, project: 'Apertre 3.0',               role: 'Top 3 Community Partner' },
];
/* ─────────────────────────────────────────────────────────────────────────── */

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';
}

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const dur = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.floor(eased * target));
      if (t < 1) requestAnimationFrame(tick);
      else setValue(target);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return value;
}

function StatCounter({
  program,
  color,
  label,
}: {
  program: string;
  color: string;
  label: string;
}) {
  const total = ACHIEVERS.filter((a) => a.program === program).length;
  const value = useCountUp(total);
  return (
    <div className="bg-white dark:bg-gray-800 pixelated-border p-4 text-center">
      <div className={`font-mono text-3xl sm:text-4xl font-bold ${color}`}>{value}</div>
      <div className={`${color} mx-auto my-2 w-8`} style={{ height: 6, boxShadow: '6px 0 0 currentColor, -6px 0 0 currentColor', background: 'currentColor' }} />
      <div className="font-mono text-[10px] tracking-widest font-bold text-black dark:text-white">{label}</div>
    </div>
  );
}

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.9-.39.99 0 1.98.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.53 6.7 4.75 5.92 4.75 4.95s.78-1.75 1.75-1.75 1.75.78 1.75 1.75S7.47 6.7 6.5 6.7zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C8.28 9.09 5.11 7.38 2.99 4.79c-.37.64-.58 1.38-.58 2.17 0 1.49.76 2.81 1.91 3.58-.71-.02-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.81 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.54-.03-.8-.08.54 1.69 2.11 2.93 3.97 2.97A8.6 8.6 0 0 1 2 18.57 12.13 12.13 0 0 0 8.56 20.5c7.88 0 12.18-6.53 12.18-12.18 0-.19 0-.37-.01-.55.84-.6 1.56-1.36 2.13-2.22z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

function SocialLink({ href, icon, brand }: { href?: string; icon: React.ReactNode; brand: string }) {
  const base = `${brand} text-white p-2 pixelated-border`;
  if (href && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} hover:scale-110 transition-transform`}>
        {icon}
      </a>
    );
  }
  return <span className={base}>{icon}</span>;
}

function AchieverCard({ achiever }: { achiever: Achiever }) {
  const s = PROGRAM_STYLES[achiever.program] ?? { chip: 'bg-gray-500', text: 'text-white', label: achiever.program.toUpperCase() };
  return (
    <article className="bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1">
      {/* Top: avatar + name */}
      <div className={`relative ${s.chip} p-6 border-b-4 border-black flex items-center gap-4`}>
        <div className={`absolute top-0 right-0 ${s.chip} ${s.text} font-mono text-[10px] font-bold tracking-widest px-2 py-1 border-l-4 border-b-4 border-black`}>
          {achiever.year}
        </div>
        <div className="w-16 h-16 bg-black text-white pixelated-border flex items-center justify-center font-mono text-xl font-bold shrink-0">
          {initials(achiever.name)}
        </div>
        <div className="min-w-0">
          <div className={`font-mono text-[10px] tracking-[0.2em] ${s.text} opacity-80 mb-1`}>{s.label}</div>
          <div className={`font-mono font-bold ${s.text} text-lg leading-tight truncate`}>{achiever.name}</div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-1">ORGANISATION</div>
        <div className="font-mono text-base font-bold text-black dark:text-white mb-4">{achiever.org}</div>

        <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-1">PROGRAM</div>
        <div className="font-mono text-sm text-gray-700 dark:text-gray-200 leading-relaxed mb-4">{achiever.project}</div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t-4 border-dashed border-black/10 dark:border-white/10">
          <span className="font-mono text-xs font-bold text-black dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 border-2 border-black dark:border-gray-500">
            {achiever.role ?? 'Contributor'}
          </span>
          <div className="flex gap-1.5">
            <SocialLink href={achiever.links?.github}   icon={<GithubIcon />}   brand="bg-[#24292e]" />
            <SocialLink href={achiever.links?.linkedin} icon={<LinkedinIcon />} brand="bg-[#0077B5]" />
          </div>
        </div>
      </div>
    </article>
  );
}

/* Pixel trophy decoration */
function PixelTrophy() {
  const rows: (string | null)[][] = [
    [null, 'y5', 'y5', 'y5', 'y5', 'y5', null],
    ['y5', 'y3', 'y5', 'y5', 'y5', 'y3', 'y5'],
    ['y5', 'y5', 'y5', 'y5', 'y5', 'y5', 'y5'],
    [null, 'y5', 'y5', 'y5', 'y5', 'y5', null],
    [null, null, 'y5', 'y5', 'y5', null, null],
    [null, 'y7', 'y7', 'y7', 'y7', 'y7', null],
  ];
  const colorMap: Record<string, string> = {
    y5: 'bg-yellow-500',
    y3: 'bg-yellow-300',
    y7: 'bg-yellow-700',
  };
  return (
    <div className="absolute bottom-8 right-8 hidden lg:block">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 12px)' }}>
        {rows.map((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <div
                key={`${ri}-${ci}`}
                className={`w-3 h-3 ${colorMap[cell]} ${cell === 'y3' ? 'animate-pulse' : ''}`}
              />
            ) : (
              <div key={`${ri}-${ci}`} className="w-3 h-3" />
            )
          )
        )}
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const programs = useMemo(
    () => ['All', ...Array.from(new Set(ACHIEVERS.map((a) => a.program)))],
    []
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ACHIEVERS.filter((a) => {
      const matchProg = activeFilter === 'All' || a.program === activeFilter;
      const haystack = `${a.name} ${a.org} ${a.project} ${a.role ?? ''} ${a.program}`.toLowerCase();
      return matchProg && (!q || haystack.includes(q));
    });
  }, [activeFilter, search]);

  const grouped = useMemo(() => {
    const map = new Map<number, Achiever[]>();
    for (const a of filtered) {
      const arr = map.get(a.year) ?? [];
      arr.push(a);
      map.set(a.year, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* ── Hero ── */}
      <section
        className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg"
      >
        {/* Decorative chips */}
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-blue-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <PixelTrophy />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-green-600 dark:text-green-400">
              [HALL OF FAME]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {ACHIEVERS.length} ACHIEVERS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            ACHIEVEMENTS
            <span className="block mt-3">
              <span className="inline-block bg-red-500 text-white px-3 py-1 pixelated-border">
                UNLOCKED
              </span>
            </span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-8">
            Celebrating community members who&apos;ve cracked the most prestigious open-source programs —{' '}
            <span className="font-bold">GSoC</span>, <span className="font-bold">LFX</span>,{' '}
            <span className="font-bold">Apertre</span>, <span className="font-bold">GSSoC</span> and beyond.
          </p>

          {/* Stat counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl">
            <StatCounter program="GSoC"    color="text-red-500"    label="GSoC"    />
            <StatCounter program="LFX"     color="text-blue-500"   label="LFX"     />
            <StatCounter program="Apertre" color="text-yellow-600" label="APERTRE" />
            <StatCounter program="GSSoC"   color="text-green-600"  label="GSSoC"   />
          </div>
        </div>
      </section>

      {/* ── Filter Rail ── */}
      <section className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b-4 border-black dark:border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-300 tracking-widest hidden sm:inline">
              PROGRAM:
            </span>
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-1 px-1 py-1">
              {programs.map((prog) => {
                const isActive = activeFilter === prog;
                const s = PROGRAM_STYLES[prog];
                const style =
                  prog === 'All'
                    ? isActive
                      ? 'bg-black text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
                    : isActive
                    ? `${s?.chip ?? 'bg-gray-500'} ${s?.text ?? 'text-white'}`
                    : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:opacity-80';
                const label = prog === 'All' ? 'ALL' : (s?.label ?? prog.toUpperCase());
                return (
                  <button
                    key={prog}
                    onClick={() => setActiveFilter(prog)}
                    className={`relative shrink-0 ${style} font-mono text-xs font-bold tracking-wider px-3 py-2 pixelated-border hover:scale-105 transition-all`}
                  >
                    {label}
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
                placeholder="Search by name, org…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono text-sm bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 pixelated-border w-56 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievers Grid ── */}
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-block bg-yellow-500 text-black px-4 py-3 font-mono font-bold pixelated-border mb-4">
                NO ACHIEVERS FOUND
              </div>
              <p className="font-mono text-gray-600 dark:text-gray-300">
                Try a different program filter or clear the search.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {grouped.map(([year, achievers]) => (
                <section key={year}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="font-mono font-bold text-black dark:text-white text-xl pixelated-border bg-white dark:bg-gray-800 px-3 py-2">
                      {year}
                    </div>
                    <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
                    <div className="font-mono text-xs font-bold tracking-[0.2em] text-gray-600 dark:text-gray-300">
                      {achievers.length} {achievers.length === 1 ? 'ACHIEVER' : 'ACHIEVERS'}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {achievers.map((a, i) => (
                      <AchieverCard key={`${a.name}-${i}`} achiever={a} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

<Footer />
    </div>
  );
}
