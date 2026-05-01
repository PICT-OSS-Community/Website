import React from 'react';
import Link from 'next/link';

type Section = 'Philosophy' | 'AI' | 'Hall of Fame' | 'General';

const SECTION_STYLES: Record<Section, { chip: string; text: string; label: string }> = {
  'Philosophy':   { chip: 'bg-blue-500',   text: 'text-white', label: 'PHILOSOPHY'   },
  'AI':           { chip: 'bg-red-500',    text: 'text-white', label: 'AI'           },
  'Hall of Fame': { chip: 'bg-yellow-500', text: 'text-black', label: 'HALL OF FAME' },
  'General':      { chip: 'bg-green-500',  text: 'text-white', label: 'GENERAL'      },
};

interface BlogPost {
  title: string;
  description: string;
  author: string;
  date: string;
  readMin: number;
  section: Section;
  href: string;
}

const FEATURED_POSTS: BlogPost[] = [
  {
    title: 'How Open Source Teaches You to Write Code for People, Not Just Machines',
    description: '"Programs must be written for people to read, and only incidentally for machines to execute."',
    author: 'Sujal Bhor',
    date: 'May 12',
    readMin: 5,
    section: 'Philosophy',
    href: 'https://medium.com/fossible/how-open-source-teaches-you-to-write-code-for-people-not-just-machines-f43000c4bf34',
  },
  {
    title: "Neha Narkhede's Journey: Open Source Innovation to Global Enterprise",
    description: 'What if one of the most powerful tools used by Netflix, Uber and Spotify was co-created by a woman who started as an open-source contributor?',
    author: 'Anish Dabhane',
    date: 'Jun 20',
    readMin: 5,
    section: 'Hall of Fame',
    href: 'https://medium.com/fossible/neha-narkhedes-journey-open-source-innovation-to-global-enterprise-f7f07a85c9cb',
  },
  {
    title: 'Open Source Hygiene 101',
    description: 'Keeping Your Repo Fresh, Secure, and Contribution-Friendly.',
    author: 'Anish Dabhane',
    date: 'Jul 4',
    readMin: 4,
    section: 'General',
    href: 'https://medium.com/fossible/open-source-hygiene-101-9322499425f7',
  },
];


function PostCard({ post, idx }: { post: BlogPost; idx: number }) {
  const s = SECTION_STYLES[post.section];
  return (
    <Link
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
    >
      <div className={`relative aspect-video overflow-hidden border-b-4 border-black ${s.chip}`}>
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-20 grid-bg" />

        {/* Corner pixels */}
        <div className="absolute top-3 left-3 w-3 h-3 bg-black" />
        <div className="absolute top-3 right-3 w-3 h-3 bg-black" />
        <div className="absolute bottom-3 left-3 w-3 h-3 bg-black" />
        <div className="absolute bottom-3 right-3 w-3 h-3 bg-black" />

        {/* Title — the entire thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h3 className={`font-mono font-bold ${s.text} text-xl sm:text-2xl leading-tight text-center group-hover:underline decoration-white decoration-4 underline-offset-4`}>
            {post.title}
          </h3>
        </div>

        {/* Category chip */}
        <div className={`absolute top-3 left-3 bg-black text-white font-mono text-[10px] font-bold tracking-widest px-2 py-1 pixelated-border`}>
          {s.label}
        </div>

        {/* Read time */}
        <div className={`absolute bottom-3 right-3 bg-black text-white font-mono text-xs font-bold px-2 py-1`}>
          {post.readMin} MIN
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
        <div className="font-mono text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 bg-black dark:bg-white shrink-0" />
          <span className="truncate">{post.author}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-400">
            {post.date.toUpperCase()}
          </span>
          <span className="font-mono text-xs font-bold text-black dark:text-white group-hover:text-yellow-600">
            READ →
          </span>
        </div>
        </div>
      </div>
    </Link>
  );
}

const Blogs = () => {
  return (
    <section id="blogs" className="bg-white dark:bg-gray-900 border-t-4 border-black dark:border-gray-500 transition-colors duration-500">

      {/* Header */}
      <div className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 text-center">
          <h2 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-4">
            FEATURED
            <span className="block mt-3">
              <span className="inline-block bg-blue-500 text-white px-3 py-1 pixelated-border">
                BLOGS
              </span>
            </span>
          </h2>
          <p className="font-mono text-base sm:text-lg text-gray-700 dark:text-gray-200 max-w-xl mx-auto leading-relaxed mt-6">
            Insightful articles and tutorials from our community writers, published under{' '}
            <a href="https://medium.com/fossible" target="_blank" rel="noopener noreferrer"
              className="underline decoration-yellow-500 decoration-4 underline-offset-4 font-bold">
              FOSSible
            </a>.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12 lg:py-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {FEATURED_POSTS.map((post, i) => (
              <PostCard key={post.href} post={post} idx={i} />
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/blogs"
              className="bg-black hover:bg-gray-800 text-white font-mono font-bold px-8 py-4 text-sm tracking-widest pixelated-border hover:scale-105 transition-all duration-200"
            >
              VIEW ALL BLOGS →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
