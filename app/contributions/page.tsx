import Header from '../components/Header';
import Footer from '../components/Footer';
import { GitPullRequest, GitMerge, Globe, Code2 } from 'lucide-react';

export default function ContributionsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      {/* Hero */}
      <section className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg">
        {/* Corner pixel accents */}
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-yellow-500', 'bg-red-500', 'bg-green-500', 'bg-blue-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-green-600 dark:text-green-400">
              [OPEN SOURCE IMPACT]
            </span>
            <span className="h-px flex-1 max-w-xs bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              PICT OSS · PUNE
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            OUR{' '}
            <span className="inline-block bg-green-500 text-white px-3 py-1 pixelated-border">
              CONTRIBUTIONS
            </span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-10">
            A showcase of open-source projects where PICT OSS Community members have merged pull requests — real code, real impact, across the globe.
          </p>

          {/* Stat placeholders */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { icon: GitMerge,      label: 'Merged PRs',      value: '—' },
              { icon: Globe,         label: 'Projects',         value: '—' },
              { icon: Code2,         label: 'Contributors',     value: '_' },
              { icon: GitPullRequest, label: 'Organisations',   value: '—' },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 pixelated-border px-4 py-3"
              >
                <Icon size={18} className="text-green-500 shrink-0" />
                <div>
                  <div className="font-mono font-bold text-black dark:text-white text-lg leading-none">
                    {value}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-gray-500 dark:text-gray-400 uppercase mt-0.5">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <main className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          {/* Pixel art terminal block */}
          <div className="inline-block bg-black text-green-400 font-mono text-sm px-6 py-4 pixelated-border mb-8 text-left">
            <span className="opacity-60">$ </span>fetch contributions --community=pict-oss<br />
            <span className="opacity-60">{'>'} </span>Gathering data
            <span className="animate-pulse">...</span>
          </div>

          <h2 className="font-mono font-bold text-black dark:text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
            DATA{' '}
            <span className="inline-block bg-yellow-500 text-black px-3 py-1 pixelated-border">
              COMING SOON
            </span>
          </h2>

          <p className="font-mono text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed mb-10">
            We're compiling every merged PR from our community members across open-source organisations worldwide. Check back soon.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/PICT-OSS-Community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-mono font-bold px-6 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <GitPullRequest size={18} />
              VIEW OUR GITHUB
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white font-mono font-bold px-6 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              ← BACK HOME
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
