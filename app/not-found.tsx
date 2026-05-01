import Link from 'next/link';
import { Home, BookOpen, GitPullRequest, Terminal } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 flex flex-col">
      <Header />

      <main className="flex-1 grid-bg flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full">

          {/* Terminal window */}
          <div className="bg-black pixelated-border mb-10">
            <div className="flex items-center gap-2 px-4 py-2 border-b-2 border-gray-700">
              <div className="w-3 h-3 bg-red-500" />
              <div className="w-3 h-3 bg-yellow-500" />
              <div className="w-3 h-3 bg-green-500" />
              <span className="font-mono text-xs text-gray-400 ml-2 tracking-widest">bash — pict-oss</span>
            </div>
            <div className="p-5 sm:p-6 font-mono text-sm space-y-2 leading-relaxed">
              <p>
                <span className="text-green-400">oss@pict</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-gray-300">GET /this-page HTTP/1.1</span>
              </p>
              <p className="text-red-400">Error: 404 Not Found — no such route exists</p>
              <p>
                <span className="text-green-400">oss@pict</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-gray-300">git log --oneline this-page</span>
              </p>
              <p className="text-red-400">fatal: your current branch 'this-page' does not have any commits</p>
              <p>
                <span className="text-green-400">oss@pict</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-white">$ </span>
                <span className="text-gray-500 animate-pulse">▌</span>
              </p>
            </div>
          </div>

          {/* 404 heading */}
          <div className="text-center mb-10">
            <p className="font-mono text-xs font-bold tracking-[0.3em] text-red-500 mb-4 uppercase">
              [ exit code 404 ]
            </p>
            <h1 className="font-mono font-bold leading-none tracking-tight text-black dark:text-white mb-6">
              <span className="text-7xl sm:text-9xl lg:text-[10rem]">
                4
                <span className="inline-block bg-red-500 text-white px-2 sm:px-3 pixelated-border">0</span>
                4
              </span>
            </h1>
            <p className="font-mono text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              This page doesn&apos;t exist — or maybe it got force-pushed out of history.
            </p>
          </div>

          {/* Pixel divider */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-3 h-3 bg-yellow-500 shrink-0" />
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <div className="w-3 h-3 bg-red-500 shrink-0" />
            <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <div className="w-3 h-3 bg-green-500 shrink-0" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-mono font-bold px-6 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <Home size={18} />
              GO HOME
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-mono font-bold px-6 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <BookOpen size={18} />
              BLOGS
            </Link>
            <Link
              href="/contributions"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-mono font-bold px-6 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <GitPullRequest size={18} />
              CONTRIBUTIONS
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
