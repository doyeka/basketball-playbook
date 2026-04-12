'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft } from 'lucide-react';
import { plays } from '@/data';
import PlayCard from '@/components/PlayCard';
import SearchBar from '@/components/SearchBar';

const BATCH_SIZE = 5;

export default function PlaysPage() {
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const searchRef = useRef<HTMLDivElement>(null);

  // Client-side search filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return plays;
    return plays.filter((p) =>
      [p.name, p.tagline, p.description].some((t) =>
        t.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [query]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // Infinite scroll sentinel
  const { ref: sentinelRef, inView } = useInView({ threshold: 0 });
  useEffect(() => {
    if (inView && hasMore) {
      setVisibleCount((c) => c + BATCH_SIZE);
    }
  }, [inView, hasMore]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Sticky top bar ── */}
      <header className="sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/8">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm shrink-0"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <h1 className="text-sm font-bold text-white/80 shrink-0">
            Plays
          </h1>

          <div className="flex-1 flex justify-center">
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <span className="text-xs text-white/30 shrink-0 hidden sm:block">
            {filtered.length} {filtered.length === 1 ? 'play' : 'plays'}
          </span>
        </div>
      </header>

      {/* ── Play list ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 space-y-8" ref={searchRef}>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-4xl mb-4">🏀</span>
            <p className="text-white/50 text-sm">
              No plays match &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setQuery('')}
              className="mt-4 text-xs text-orange-400 hover:text-orange-300 transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {visible.map((play) => (
              <PlayCard key={play.id} play={play} />
            ))}

            {/* Infinite scroll sentinel */}
            <div ref={sentinelRef} className="h-1" aria-hidden />

            {!hasMore && filtered.length > 0 && (
              <p className="text-center text-xs text-white/25 pb-4">
                All {filtered.length} {filtered.length === 1 ? 'play' : 'plays'} shown
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
