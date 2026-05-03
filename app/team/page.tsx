'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Category = 'Co-Founder' | 'Founding Team' | 'Community Lead' | 'Design Team' | 'Social Media';

const CATEGORY_STYLES: Record<Category, { chip: string; text: string; label: string }> = {
  'Co-Founder':    { chip: 'bg-yellow-500', text: 'text-black', label: 'CO-FOUNDER'    },
  'Founding Team': { chip: 'bg-red-500',    text: 'text-white', label: 'FOUNDING TEAM' },
  'Community Lead':{ chip: 'bg-blue-500',   text: 'text-white', label: 'COMMUNITY LEAD'},
  'Design Team':   { chip: 'bg-green-500',  text: 'text-white', label: 'DESIGN TEAM'   },
  'Social Media':  { chip: 'bg-red-500',    text: 'text-white', label: 'SOCIAL MEDIA'  },
};

const DISPLAY_ORDER: Category[] = [
  'Co-Founder',
  'Founding Team',
  'Community Lead',
  'Design Team',
  'Social Media',
];

interface Member {
  name: string;
  role: string;
  category: Category;
  photo?: string;
  photo2?: string;
  links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

/* ── Team roster — update to add / remove members ────────────────────────── */
const TEAM_MEMBERS: Member[] = [
  /* Co-Founders */
  { name: 'Anish Dabhane',    role: 'Co-Founder & Lead',      category: 'Co-Founder',    photo: '/Anish_1.jpeg',   photo2: '/Anish_2.jpeg',   links: { github: 'https://github.com/Spartan-71', linkedin: 'https://www.linkedin.com/in/anish-dabhane-0669781b5' } },
  { name: 'Kshitij Aucharmal',role: 'Co-Founder',             category: 'Co-Founder',    photo: '/Kshitij_1.jpeg', photo2: '/Kshitij_2.jpeg', links: { github: 'https://github.com/kshitijaucharmal', linkedin: 'https://linkedin.com/in/kshitijaucharmal21' } },

  /* Founding Team */
  { name: 'Anshul Kalbande',  role: 'Website Lead',           category: 'Founding Team', photo: '/Anshul_1.jpeg',  photo2: '/Anshul_2.jpeg',  links: { github: 'https://github.com/anshulLuhsna', linkedin: 'https://www.linkedin.com/in/anshul-kalbande-a44b36219/' } },
  { name: 'Aryan Kadole',     role: 'Technical Lead',         category: 'Founding Team', photo: '/Aryan_1.jpeg',   photo2: '/Aryan_2.jpeg',   links: { github: 'https://github.com/ak1932', linkedin: 'https://www.linkedin.com/in/aryan-kadole-855bb5204/' } },
  { name: 'Chirag Dave',      role: 'Website Lead',           category: 'Founding Team', photo: '/Chirag.png',    links: { github: 'https://github.com/definitelynotchirag', linkedin: 'https://www.linkedin.com/in/chirag-dave-751a91249' } },
  { name: 'Anurag Mandke',    role: 'Founding Member',        category: 'Founding Team', photo: '/Anurag_1.jpeg',  photo2: '/Anurag_2.jpeg',  links: { github: 'https://github.com/AnuragMandke', linkedin: 'https://www.linkedin.com/in/anuragmandke' } },
  { name: 'Sujal Bhor',       role: 'Technical Lead',         category: 'Founding Team', photo: '/Sujal.jpeg',    links: { github: 'https://github.com/bhorsujal', linkedin: 'https://linkedin.com/in/sujal-bhor' } },
  { name: 'Shantanu Wable',   role: 'Advisor',                category: 'Founding Team', photo: '/Shantanu.png',  links: { github: 'https://github.com/shxntanu', linkedin: 'https://www.linkedin.com/in/shxntanu/' } },

  /* Community Leads */
  { name: 'Sarang Rao',       role: 'Community Lead',         category: 'Community Lead', photo: '/Sarang.jpeg',   links: { github: 'https://github.com/SarangRao20', linkedin: 'https://www.linkedin.com/in/sarang-rao-262bbb324/' } },
  { name: 'Vedant Jadhav',    role: 'Community Lead',         category: 'Community Lead', photo: '/Vedant.jpeg',   links: { github: 'https://github.com/yokelman', linkedin: 'https://www.linkedin.com/in/vedant-jadhav-b400a8352/' } },

  /* Design Team */
  { name: 'Trupti Mahajan',   role: 'Design Head',            category: 'Design Team',   photo: '/Trupti.jpeg',   links: { github: 'https://github.com/Mahajan-Trupti', linkedin: 'https://www.linkedin.com/in/truptimahajan/' } },
  { name: 'Salina Tamboli',   role: 'Design Head',            category: 'Design Team',   photo: '/Salina.png',    links: { github: 'https://github.com/Salina00', linkedin: 'https://www.linkedin.com/in/salina-tamboli' } },

  /* Social Media */
  { name: 'Aswathi Pillai',   role: 'Social Media Head',      category: 'Social Media',  photo: '/Aswathi.jpeg',  links: { linkedin: 'https://www.linkedin.com/in/aswathi-pillai-736131215/' } },
];
/* ─────────────────────────────────────────────────────────────────────────── */

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join('') || '?';
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

function SocialLink({ href, icon, brand }: { href?: string; icon: React.ReactNode; brand: string }) {
  const base = `${brand} text-white p-2 pixelated-border`;
  if (href && href !== '#') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} hover:scale-110 transition-transform`}>
        {icon}
      </a>
    );
  }
  return (
    <span className={base}>
      {icon}
    </span>
  );
}

function MemberCard({ member }: { member: Member }) {
  const s = CATEGORY_STYLES[member.category];

  return (
    <article className="group bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1">
      {/* Photo / avatar */}
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-700 overflow-hidden border-b-4 border-black">
        {member.photo ? (
          <>
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className={`object-cover object-top transition-opacity duration-500 ${member.photo2 ? 'group-hover:opacity-0' : ''}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {member.photo2 && (
              <Image
                src={member.photo2}
                alt={`${member.name} alternate`}
                fill
                className="object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          </>
        ) : (
          <div className={`absolute inset-0 ${s.chip} flex items-center justify-center`}>
            <span className={`font-mono text-5xl font-bold ${s.text}`}>{initials(member.name)}</span>
          </div>
        )}

      </div>

      {/* Body */}
      <div className="p-5 flex flex-col">
        <h3 className="font-mono font-bold text-black dark:text-white text-lg leading-tight mb-1">
          {member.name}
        </h3>
        <p className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-3">
          {member.role}
        </p>
        <div className="flex gap-1.5">
          <SocialLink href={member.links?.github}   icon={<GithubIcon />}   brand="bg-[#24292e]" />
          <SocialLink href={member.links?.linkedin} icon={<LinkedinIcon />} brand="bg-[#0077B5]" />
        </div>
      </div>
    </article>
  );
}

/* ── Pixel people decoration ──────────────────────────────────────────────── */
function PixelPeople() {
  const person = (color: string) => {
    const cells = [null,'x',null, 'x','x','x', 'x','x','x', null,'x',null, null,'x',null];
    return (
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(3, 12px)' }}>
        {cells.map((c, i) =>
          c ? <div key={i} className={`w-3 h-3 ${color}`} /> : <div key={i} className="w-3 h-3" />
        )}
      </div>
    );
  };
  return (
    <div className="absolute bottom-8 right-8 hidden lg:flex gap-4 items-end">
      {person('bg-yellow-500')}
      {person('bg-blue-500')}
      {person('bg-green-500')}
      {person('bg-red-500')}
    </div>
  );
}

export default function TeamPage() {
  const grouped = useMemo(() => {
    const map = new Map<Category, Member[]>();
    for (const cat of DISPLAY_ORDER) {
      const members = TEAM_MEMBERS.filter((m) => m.category === cat);
      if (members.length > 0) map.set(cat, members);
    }
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* ── Hero ── */}
      <section className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg">
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-yellow-500', 'bg-blue-500', 'bg-green-500', 'bg-red-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <PixelPeople />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
              [OUR TEAM]
            </span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {TEAM_MEMBERS.length} MEMBERS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            THE PEOPLE
            <span className="block mt-3">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 pixelated-border">
                BEHIND PICT OSS
              </span>
            </span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed">
            Meet the minds that built and run the Community — from the founders who started it all,
            to the community leads, designers, and social media team keeping the ecosystem alive.
          </p>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {Array.from(grouped.entries()).map(([cat, members]) => {
              const s = CATEGORY_STYLES[cat];
              return (
                <section key={cat}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`${s.chip} ${s.text} font-mono font-bold text-sm pixelated-border px-3 py-2`}>
                      {s.label}
                    </div>
                    <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
                    <div className="font-mono text-xs font-bold tracking-[0.2em] text-gray-600 dark:text-gray-300">
                      {members.length} {members.length === 1 ? 'MEMBER' : 'MEMBERS'}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {members.map((m, i) => (
                      <MemberCard key={`${m.name}-${i}`} member={m} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
