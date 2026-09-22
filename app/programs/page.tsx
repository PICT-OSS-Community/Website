'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ACHIEVERS } from '../data/achievers';

type ProgramColor = 'red' | 'blue' | 'yellow' | 'green';

interface ProgramLink {
  label: string;
  href: string;
}

interface Program {
  acronym: string;
  name: string;
  color: ProgramColor;
  tagline: string;
  duration: string;
  what: string;
  benefits: string[];
  participate: string[];
  links: ProgramLink[];
  programKey: string;
}

const COLOR_CLASSES: Record<ProgramColor, { chip: string; text: string }> = {
  red:    { chip: 'bg-red-500',    text: 'text-white'  },
  blue:   { chip: 'bg-blue-500',   text: 'text-white'  },
  yellow: { chip: 'bg-yellow-500', text: 'text-black'  },
  green:  { chip: 'bg-green-500',  text: 'text-white'  },
};

/* ── Programs catalog ─────────────────────────────────────────────────────── */
/* `programKey` must match the `program` value used in app/achievements/page.tsx
   so the "cracked it" members stay in sync with the hall of fame.            */
const PROGRAMS: Program[] = [
  {
    acronym: 'GSoC',
    name: 'Google Summer of Code',
    color: 'red',
    tagline: "Google's global, online program that introduces university students to open-source software development.",
    duration: '~12 weeks · May–Aug',
    what: 'Sponsored by Google, GSoC matches you with an open-source organisation for a ~12-week coding project. You work remotely with an experienced mentor, contribute real code to a real project, and get a stipend from Google for the work.',
    benefits: [
      'Paid stipend for the whole coding period',
      '1-on-1 mentorship from project maintainers',
      'Real production code on everyday open-source tools',
      'Certificate, swag & official recognition from Google',
    ],
    participate: [
      'Check eligibility (18+ student or recent graduate)',
      'Explore the org list when it is announced (Feb 2026)',
      'Reach out to orgs, study their ideas & draft a proposal',
      'Submit your proposal before the deadline (Mar 31, 2026)',
      'If accepted, code with your mentor from May to Aug',
    ],
    links: [
      { label: 'OFFICIAL SITE',     href: 'https://summerofcode.withgoogle.com/' },
      { label: 'PROGRAM DETAILS',   href: 'https://summerofcode.withgoogle.com/programs/2026' },
    ],
    programKey: 'GSoC',
  },
  {
    acronym: 'LFX',
    name: 'Linux Foundation Mentorship',
    color: 'blue',
    tagline: 'Structured mentorship from The Linux Foundation on real projects inside the CNCF & Linux ecosystems.',
    duration: '~8–12 weeks · per term',
    what: 'LFX Mentorship pairs mentees with a project mentor for a set term (Spring / Summer / Fall). You own a defined scope of work on a world-class open-source project — think Kubernetes, OpenTelemetry, Prometheus and more — while learning from maintainers.',
    benefits: [
      'Paid stipend for every term',
      'Mentoring by core project maintainers',
      'Hands-on experience on world-class infra projects',
      'A strong bridge into GSoC and CNCF contributions',
    ],
    participate: [
      'Create a free LFX profile (profile.lfx.dev)',
      'Browse open mentorship projects on the platform',
      'Submit your application for the projects you like',
      'Interview with the project mentor',
      'Complete the mentorship scope for your term',
    ],
    links: [
      { label: 'MENTORSHIP PLATFORM', href: 'https://mentorship.lfx.dev/' },
      { label: 'LFX DOCS',            href: 'https://docs.linuxfoundation.org/lfx/mentorship' },
    ],
    programKey: 'LFX',
  },
  {
    acronym: 'GSSoC',
    name: 'GirlScript Summer of Code',
    color: 'green',
    tagline: 'One of India\u2019s biggest open-source programs by the girl-first GirlScript Foundation — free for everyone.',
    duration: '~3 months · May–Aug',
    what: 'GSSoC is a multi-month open-source contribution program where contributors, mentors and project admins work together on fresh student-run projects. You climb a global leaderboard through genuine PRs, guided by mentors along the way.',
    benefits: [
      '100% free and open to participants worldwide',
      'Discover & contribute to dozens of new projects',
      'Roles for Contributors, Mentors & Project Admins',
      'Rank-based rewards, certificates and swag',
    ],
    participate: [
      'Register for free on the official site',
      'Pick projects from the season\u2019s registered list',
      'Start sending PRs during the contribution period',
      'Track your global rank on the leaderboard',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://gssoc.girlscript.org/' },
    ],
    programKey: 'GSSoC',
  },
  {
    acronym: 'SWoC',
    name: 'Social Winter of Code',
    color: 'yellow',
    tagline: 'A free winter open-source program that helps beginners start contributing with mentor guidance.',
    duration: '~2 months · Jan–Mar',
    what: 'SWoC is a seasonal open-source contribution program. Students register as contributors and work on registered projects during a fixed winter window, following real Git/GitHub workflows under the guidance of mentors and project admins.',
    benefits: [
      'Completely free to participate',
      'Mentorship & structured project guidance',
      'Contribution certificates & seasonal goodies',
      'Real merge-testable PR experience on GitHub',
    ],
    participate: [
      'Register as a contributor during the registration phase',
      'Shortlist the projects that interest you',
      'Contribute code/docs throughout the duration',
      'Get your PRs merged before the end of the window',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://www.swoc.in/' },
    ],
    programKey: 'SWoC',
  },
  {
    acronym: 'OSCG',
    name: 'Open Source Connect Global',
    color: 'green',
    tagline: 'A global community-driven initiative that bridges the gap between learning open source and building real software.',
    duration: '~2 months · Feb–Mar',
    what: 'OSCG is an international, fully-online program where contributors, mentors and project admins collaborate on real-world and open-source startup projects in a structured, sustainable way — a journey, not a hackathon.',
    benefits: [
      'Contribute to real-world startup & OSS projects',
      'Collaborate with global teams and mentors',
      'Learn professional contribution workflows',
      'Official certificates for active participation',
      'Talks from international speakers',
    ],
    participate: [
      'Explore the projects directory & pick a project',
      'Register for the ongoing season',
      'Read the contribution guidelines carefully',
      'Start contributing (features, fixes, docs, tooling)',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://www.osconnect.org/' },
      { label: 'PROJECTS',      href: 'https://www.osconnect.org/projects' },
      { label: 'GUIDELINES',    href: 'https://github.com/Open-Source-Connect/OSCG-2026' },
    ],
    programKey: 'OSCG',
  },
  {
    acronym: 'ESoC',
    name: 'European Summer of Code',
    color: 'blue',
    tagline: 'A European program that pays newcomers to code full-time on open source and applied AI projects.',
    duration: '~12 weeks · full-time',
    what: 'ESoC funds a flat-rate stipend so you can spend ~12 weeks working full-time on real open source. Selection happens through multiple hubs across Europe, which bring you community, mentorship and beyond-code skills on top of the coding.',
    benefits: [
      'Flat-rate financial stipend for the program',
      'Full-time, remote contribution to open source & AI',
      'Community & mentorship via local hubs',
      'Beyond-code skills (feedback, presence, collaboration)',
    ],
    participate: [
      'Follow the hub announcements and apply',
      'Choose or propose the project that fits you',
      'Work full-time with your project team during summer',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://www.esoc.dev/' },
    ],
    programKey: 'ESoC',
  },
  {
    acronym: 'KWoC',
    name: 'Kharagpur Winter of Code',
    color: 'red',
    tagline: 'A 5-week winter open-source program by KOSS, IIT Kharagpur — built as a low-pressure first open-source experience.',
    duration: '5 weeks · Nov–Jan',
    what: 'KWoC is an online, mentored winter program open to students from every college. You pick projects listed by mentors, contribute over 5 weeks, and the best contributors earn certificates, tags and project stickers.',
    benefits: [
      'Designed for open-source newcomers',
      'Mentor guidance on every project',
      'Certificates, tags & project stickers',
      'Perfect preparation for bigger programs like GSoC',
    ],
    participate: [
      'Register as a student when registrations open',
      'Shortlist projects and pick your favourites',
      'Contribute consistently during the 5-week period',
      'Clear your evaluations to earn your certificate',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://kwoc.kossiitkgp.org/' },
    ],
    programKey: 'KWoC',
  },
  {
    acronym: 'SoB',
    name: 'Summer of Bitcoin',
    color: 'yellow',
    tagline: 'A global, remote internship that pays university students in Bitcoin to work on Bitcoin-related open source.',
    duration: '12 weeks · May–Aug',
    what: 'Summer of Bitcoin is a 12-week online internship where university students work full-time on open-source projects related to Bitcoin — getting hands-on experience in crypto development while being compensated, literally, in the currency they help build.',
    benefits: [
      'Stipend paid in Bitcoin',
      'Work alongside Bitcoin contributors & the community',
      'Real experience in blockchain and open-source dev',
      'Premium weekly stipends for top contributors',
    ],
    participate: [
      'Apply online when applications open (~Feb)',
      'Clear the selection process',
      'Get matched to a project and work with your mentor',
    ],
    links: [
      { label: 'OFFICIAL SITE', href: 'https://www.summerofbitcoin.org/' },
    ],
    programKey: 'Summer of Bitcoin',
  },
];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';
}

function ProgramCard({ program }: { program: Program }) {
  const c = COLOR_CLASSES[program.color];
  const members = ACHIEVERS.filter((a) => a.program === program.programKey);

  return (
    <article className="bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-y-1">
      {/* Header */}
      <header className={`relative ${c.chip} p-6 border-b-4 border-black dark:border-gray-500`}>
        <div className={`absolute top-3 right-3 ${c.chip} ${c.text} border-2 border-black dark:border-gray-500 px-2 py-1 font-mono text-[10px] font-bold tracking-widest`}>
          {program.duration}
        </div>
        <div className={`font-mono text-[10px] tracking-[0.2em] ${c.text} opacity-80 mb-1`}>
          [OPEN SOURCE PROGRAM]
        </div>
        <h2 className={`font-mono font-bold ${c.text} text-2xl sm:text-3xl leading-none mb-2`}>
          {program.acronym}
        </h2>
        <p className={`font-mono font-bold ${c.text} text-base leading-snug`}>
          {program.name}
        </p>
      </header>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col gap-5">
        {/* Short description */}
        <p className="font-mono text-sm text-gray-700 dark:text-gray-200 leading-relaxed border-l-4 border-black dark:border-white/20 pl-3">
          {program.tagline}
        </p>

        {/* What is it */}
        <div>
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-1">WHAT IS IT</div>
          <p className="font-mono text-sm text-black dark:text-white leading-relaxed">{program.what}</p>
        </div>

        {/* Benefits */}
        <div>
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-2">BENEFITS</div>
          <ul className="space-y-1.5">
            {program.benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 font-mono text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                <span className={`w-2.5 h-2.5 ${c.chip} shrink-0 mt-1.5`} />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* How to participate */}
        <div>
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-2">HOW TO PARTICIPATE</div>
          <ol className="space-y-1.5">
            {program.participate.map((step, i) => (
              <li key={step} className="flex items-start gap-2 font-mono text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                <span className={`${c.chip} ${c.text} font-mono text-[10px] font-bold w-5 h-5 shrink-0 flex items-center justify-center border border-black dark:border-gray-500`}>
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Links */}
        <div>
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-2">RELEVANT LINKS</div>
          <div className="flex flex-wrap gap-2">
            {program.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white dark:bg-gray-700 font-mono text-xs font-bold px-3 py-2 pixelated-border hover:scale-105 hover:bg-red-600 dark:hover:bg-red-600 transition-all duration-200"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Community members who cracked it */}
        <div className="mt-auto pt-4 border-t-4 border-dashed border-black/10 dark:border-white/10">
          <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-3">
            COMMUNITY MEMBERS WHO CRACKED IT
          </div>
          {members.length > 0 ? (
            <div className="space-y-2.5">
              {members.map((m, i) => (
                <div key={`${m.name}-${i}`} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black text-white pixelated-border flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {initials(m.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-bold text-black dark:text-white truncate">{m.name}</div>
                    <div className="font-mono text-[11px] text-gray-500 dark:text-gray-300 truncate">
                      {m.role ?? 'Contributor'} · {m.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="font-mono text-xs font-bold text-black dark:text-white bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-black/40 dark:border-white/40 px-3 py-2 w-fit">
              NO ALUMNI YET — BE THE FIRST!
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/* Pixel flag decoration */
function PixelFlag() {
  const rows: (string | null)[][] = [
    ['p9', null, null, null, null, null, null, null, null],
    ['p9', 'g9', 'b1', 'b2', 'r1', 'y1', 'g1', null, null],
    ['p9', 'g9', 'b1', 'b2', 'r1', 'y1', 'g1', null, null],
    ['p9', null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];
  const colorMap: Record<string, string> = {
    p9: 'bg-gray-900',
    g9: 'bg-gray-300 dark:bg-gray-500',
    b1: 'bg-blue-500',
    b2: 'bg-blue-700',
    r1: 'bg-red-500',
    y1: 'bg-yellow-500',
    g1: 'bg-green-500',
  };
  return (
    <div className="absolute bottom-8 right-8 hidden lg:block">
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(9, 12px)' }}>
        {rows.map((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <div key={`${ri}-${ci}`} className={`w-3 h-3 ${colorMap[cell]}`} />
            ) : (
              <div key={`${ri}-${ci}`} className="w-3 h-3" />
            )
          )
        )}
      </div>
    </div>
  );
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* ── Hero ── */}
      <section className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg">
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <PixelFlag />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-green-600 dark:text-green-400">
              [PROGRAMS]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {PROGRAMS.length} PROGRAMS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            OPEN SOURCE
            <span className="block mt-3">
              <span className="inline-block bg-green-500 text-white px-3 py-1 pixelated-border">
                PROGRAMS
              </span>
            </span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-3xl leading-relaxed mb-8">
            The most popular open-source programs our community targets — what they are, their
            benefits, how to crack them, and <span className="font-bold">who from PICT OSS</span> already has.
          </p>
        </div>
      </section>

      {/* ── Programs grid ── */}
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {PROGRAMS.map((p) => (
              <ProgramCard key={p.acronym} program={p} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}