// Fails if any cube tile is missing a real projects.json entry.
import { readFileSync } from 'node:fs';

const cube = readFileSync('app/components/Cube3D.tsx', 'utf8');
const data = JSON.parse(readFileSync('app/data/projects.json', 'utf8'));

const tiles = [...cube.matchAll(/name: '([^']+)', logo:/g)].map((m) => m[1]);
const errors = [];

for (const tile of tiles) {
  const p = data.projects[tile];
  if (!p) {
    errors.push(`tile "${tile}" has no entry in app/data/projects.json`);
    continue;
  }
  for (const field of ['name', 'logo', 'description', 'longDescription', 'category', 'language', 'githubUrl', 'websiteUrl', 'features']) {
    if (!p[field]) errors.push(`"${tile}" is missing "${field}"`);
  }
  if (typeof p.stars !== 'number' || typeof p.forks !== 'number') errors.push(`"${tile}" has no real star/fork counts`);
  if (p.githubUrl?.includes('github.com/example/')) errors.push(`"${tile}" still has a fabricated repo URL`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`ok: ${tiles.length} cube tiles all have real project data`);
