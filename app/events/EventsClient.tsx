'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CATEGORY_STYLES: Record<string, { bg: string; chip: string; label: string }> = {
  Workshop: { bg: 'bg-red-500', chip: 'bg-red-500', label: 'WORKSHOP' },
  Talk: { bg: 'bg-blue-500', chip: 'bg-blue-500', label: 'TALK' },
  Tutorial: { bg: 'bg-yellow-500', chip: 'bg-yellow-500', label: 'TUTORIAL' },
  Panel: { bg: 'bg-green-500', chip: 'bg-green-500', label: 'PANEL' },
  Hackathon: { bg: 'bg-red-500', chip: 'bg-red-500', label: 'HACKATHON' },
};

export interface Session {
  id: string; // YouTube video id
  title: string;
  speaker: string;
  date: string; // ISO date string
  time?: string;
  duration?: string; // not available via RSS; optional
  category: string;
  tags: string[];
  series?: string;
}

function fmtDate(d: string) {
  try {
    return new Date(d)
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
  } catch {
    return d;
  }
}

function isPlaceholder(id: string) {
  return !id || id.startsWith('PLACEHOLDER_');
}

function PlaceholderThumb({ category, idx }: { category: string; idx: number }) {
  const style = CATEGORY_STYLES[category] ?? { bg: 'bg-gray-500', label: 'SESSION' };
  return (
    <div className={`absolute inset-0 ${style.bg} flex items-center justify-center overflow-hidden`}>
      <div className="absolute inset-0 opacity-30 grid-bg" />
      <div className="relative z-10 text-center px-6">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/80 mb-2">
          SESSION {String(idx + 1).padStart(2, '0')}
        </div>
        <div className="inline-block bg-black text-white font-mono text-xs font-bold px-2 py-1 pixelated-border">
          {style.label}
        </div>
      </div>
      <div className="absolute top-3 left-3 w-3 h-3 bg-black" />
      <div className="absolute top-3 right-3 w-3 h-3 bg-black" />
      <div className="absolute bottom-3 left-3 w-3 h-3 bg-black" />
      <div className="absolute bottom-3 right-3 w-3 h-3 bg-black" />
    </div>
  );
}

interface ModalState {
  id: string;
  title: string;
}

function VideoModal({ modal, onClose }: { modal: ModalState | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (modal) el.showModal();
    else el.close();
  }, [modal]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const src = modal && !isPlaceholder(modal.id) ? `https://www.youtube.com/embed/${modal.id}?autoplay=1&rel=0` : null;
  const hasRecording = !!src;

  return (
    <dialog
      ref={dialogRef}
      className="bg-transparent p-0 m-auto max-w-[min(960px,95vw)] w-full backdrop:bg-black/70"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="bg-black pixelated-border text-white">
        <div className="flex justify-between items-center px-4 py-2 border-b-4 border-black bg-red-500">
          <div className="font-mono text-sm font-bold truncate">{modal?.title}</div>
          <button
            onClick={onClose}
            className="bg-black text-white px-2 py-1 font-mono text-xs pixelated-border hover:scale-105 transition-transform"
          >
            CLOSE ✕
          </button>
        </div>
        <div className="aspect-video w-full bg-black">
          {hasRecording ? (
            <iframe
              className="w-full h-full"
              src={src}
              title="Session recording"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-sm text-white/80">
              Recording not available
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default function EventsClient({ sessions }: { sessions: Session[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalState | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(sessions.map((s) => s.category)))], [sessions]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sessions.filter((s) => {
      const matchCat = activeFilter === 'All' || s.category === activeFilter;
      const haystack = `${s.title} ${s.speaker} ${s.tags.join(' ')} ${s.category} ${s.series ?? ''}`.toLowerCase();
      return matchCat && (!q || haystack.includes(q));
    });
  }, [activeFilter, search, sessions]);

  const grouped = useMemo(() => {
    const map = new Map<string, Session[]>();
    for (const s of filtered) {
      const key = s.series?.trim() || 'Sessions';
      const arr = map.get(key) ?? [];
      arr.push(s);
      map.set(key, arr);
    }

    const groups = Array.from(map.entries()).map(([series, items]) => {
      const sorted = [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const latest = sorted.length ? Math.max(...sorted.map((x) => new Date(x.date).getTime())) : 0;
      return { series, items: sorted, latest };
    });

    // Sort series by latest session date (desc), then name (asc).
    groups.sort((a, b) => b.latest - a.latest || a.series.localeCompare(b.series));

    return groups;
  }, [filtered]);

  function openModal(s: Session) {
    setModal({ id: s.id, title: s.title });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
      <Header />

      <section className="relative border-b-4 border-black dark:border-gray-500 overflow-hidden grid-bg">
        <div className="absolute top-10 right-10 hidden md:flex gap-2">
          {['bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'].map((c) => (
            <div key={c} className={`w-6 h-6 ${c} pixelated-border`} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-red-500">[ARCHIVE]</span>
            <span className="h-px flex-1 bg-black/20 dark:bg-white/20" />
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-black dark:text-white">
              {sessions.length} SESSIONS
            </span>
          </div>

          <h1 className="font-mono font-bold text-black dark:text-white leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-6">
            EVENTS &amp;{' '}
            <span className="inline-block bg-red-500 text-white px-3 py-1 pixelated-border ml-1">SESSIONS</span>
          </h1>

          <p className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-200 max-w-2xl leading-relaxed mb-8">
            Every talk, workshop, and event hosted by the PICT OSS Community — all in one place. Press{' '}
            <span className="bg-black text-white px-1.5 py-0.5 text-sm">▶</span> to watch available recordings.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.youtube.com/@PICT-OSS-Community"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" />
              </svg>
              VIEW CHANNEL
            </a>
            <a
              href="#sessions"
              className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-black dark:text-white font-mono font-bold px-5 py-3 pixelated-border hover:scale-105 transition-all duration-200"
            >
              BROWSE ARCHIVE ↓
            </a>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b-4 border-black dark:border-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold text-gray-500 dark:text-gray-300 tracking-widest hidden sm:inline">
              FILTER:
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
                      ? `${CATEGORY_STYLES[cat]?.bg ?? 'bg-gray-500'} text-white`
                      : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white hover:opacity-80';
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`relative shrink-0 ${style} font-mono text-xs font-bold tracking-wider px-3 py-2 pixelated-border hover:scale-105 transition-all`}
                  >
                    {cat.toUpperCase()}
                    {isActive && <span className="absolute left-1.5 right-1.5 -bottom-1.5 h-1 bg-current" />}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto hidden md:flex items-center gap-2">
              <input
                type="search"
                placeholder="Search sessions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="font-mono text-sm bg-white dark:bg-gray-900 text-black dark:text-white px-3 py-2 pixelated-border w-56 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <main id="sessions" className="bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="inline-block bg-yellow-500 text-black px-4 py-3 font-mono font-bold pixelated-border mb-4">
                NO SESSIONS FOUND
              </div>
              <p className="font-mono text-gray-600 dark:text-gray-300">Try a different filter or clear the search.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {grouped.map((g) => (
                <section key={g.series}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="font-mono font-bold text-black dark:text-white text-xl pixelated-border bg-white dark:bg-gray-800 px-3 py-2">
                      {g.series}
                    </div>
                    <div className="h-px flex-1 bg-black/20 dark:bg-white/20" />
                    <div className="font-mono text-xs font-bold tracking-[0.2em] text-gray-600 dark:text-gray-300">
                      {g.items.length} SESSIONS
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {g.items.map((s, idx) => {
                      const cat =
                        CATEGORY_STYLES[s.category] ?? { chip: 'bg-gray-500', label: s.category.toUpperCase() };
                      const hasRealThumb = !isPlaceholder(s.id);
                      const hasRecording = hasRealThumb;
                      return (
                        <article
                          key={s.id || `${s.title}-${idx}`}
                          onClick={hasRecording ? () => openModal(s) : undefined}
                          className={`group bg-white dark:bg-gray-800 pixelated-border flex flex-col transition-transform duration-200 ${hasRecording ? 'cursor-pointer hover:-translate-x-1 hover:-translate-y-1' : 'cursor-default'}`}
                        >
                          <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden border-b-4 border-black">
                            {hasRealThumb ? (
                              <img
                                src={`https://i.ytimg.com/vi/${s.id}/hqdefault.jpg`}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <PlaceholderThumb category={s.category} idx={idx} />
                            )}
                            {hasRecording && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-red-500 text-white px-4 py-3 pixelated-border font-mono font-bold flex items-center gap-2">
                                  ▶ WATCH
                                </div>
                              </div>
                            )}
                            <div
                              className={`absolute top-3 left-3 ${cat.chip} text-white font-mono text-[10px] font-bold tracking-widest px-2 py-1 pixelated-border`}
                            >
                              {cat.label}
                            </div>
                            {!hasRecording && (
                              <div className="absolute bottom-3 right-3 bg-black/85 text-white font-mono text-[10px] font-bold tracking-widest px-2 py-1">
                                NO RECORDING
                              </div>
                            )}
                            {!!s.duration && (
                              <div className="absolute bottom-3 right-3 bg-black/85 text-white font-mono text-xs font-bold px-2 py-1">
                                {s.duration}
                              </div>
                            )}
                          </div>

                          <div className="p-5 flex-1 flex flex-col">
                            <div className="font-mono text-[11px] tracking-widest text-gray-500 dark:text-gray-300 mb-2">
                              {fmtDate(s.date)}
                              {s.time ? <span className="ml-2 text-gray-400 dark:text-gray-400">• {s.time}</span> : null}
                            </div>
                            <h3 className="font-mono font-bold text-black dark:text-white text-lg leading-tight mb-3">
                              {s.title}
                            </h3>
                            <div className="font-mono text-sm text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2">
                              <span className="inline-block w-2 h-2 bg-black dark:bg-white shrink-0" />
                              {s.speaker}
                            </div>
                            <div className="mt-auto flex flex-wrap gap-1.5">
                              {s.tags.map((t) => (
                                <span
                                  key={t}
                                  className="font-mono text-[10px] uppercase tracking-wider bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 border-2 border-black dark:border-gray-500"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <VideoModal modal={modal} onClose={() => setModal(null)} />
    </div>
  );
}

