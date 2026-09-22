export interface Achiever {
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
export const ACHIEVERS: Achiever[] = [
  { name: 'Soham Metha',     program: 'LFX',     org: 'The Linux Foundation',            year: 2025, project: 'LFX Mentorship 2025',        role: 'Mentee'              },
  { name: 'Anish Dabhane',   program: 'LFX',     org: 'The Linux Foundation',            year: 2025, project: 'LFX Mentorship 2025',        role: 'Mentee',             links: { github: 'https://github.com/Spartan-71', linkedin: 'https://www.linkedin.com/in/anish-dabhane-0669781b5' } },
  { name: 'Sujal Bhor',      program: 'GSoC',    org: 'The Linux Foundation',            year: 2025, project: 'Google Summer of Code 2025', role: 'Contributor',        links: { github: 'https://github.com/bhorsujal', linkedin: 'https://linkedin.com/in/sujal-bhor' } },
  { name: 'Soham Mehta',     program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Project Admin'      },
  { name: 'Anish Dabhane',   program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Campus Ambassador',  links: { github: 'https://github.com/Spartan-71', linkedin: 'https://www.linkedin.com/in/anish-dabhane-0669781b5' } },
  { name: 'Anay Patil',   program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Campus Ambassador',  links: { github: 'https://github.com/anaypatil101', linkedin: 'https://www.linkedin.com/in/anaypatil29' } },
  { name: 'Farkhanda Dalal', program: 'GSSoC',   org: 'The GirlScript Foundation',  year: 2025, project: 'GSSoC 2025',                            role: 'Rank 71',           links: { github: 'https://github.com/Farkhanda-Dalal', linkedin: 'https://www.linkedin.com/in/farkhanda-dalal/' } },
  { name: 'Renuka Bhavsar',  program: 'Apertre', org: 'Resourcio Community',             year: 2026, project: 'Apertre 3.0',               role: 'Top 50 Contributors'   },
  { name: 'PICT OSS Community', program: 'Apertre', org: 'Resourcio Community',          year: 2026, project: 'Apertre 3.0',               role: 'Top 3 Community Partner' },
];
/* ─────────────────────────────────────────────────────────────────────────── */