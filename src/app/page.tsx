import Link from 'next/link';
import { plays } from '@/data';

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        {/* Wordmark */}
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-4">
            Oyeka Labs
          </span>
          <h1 className="text-6xl sm:text-7xl font-black tracking-tight text-white leading-none">
            Play
            <span className="text-orange-500">book</span>
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-sm mx-auto leading-relaxed">
            Learn the plays. Know your role. Execute.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/plays"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold
                     px-8 py-3.5 rounded-full text-sm transition-colors mt-2 shadow-lg shadow-orange-500/20"
        >
          View All Plays
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </section>

      {/* ── Play Cards ── */}
      <section className="px-6 pb-24 max-w-4xl mx-auto w-full">
        <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-white/35 mb-6">
          Offensive Sets
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {plays.map((play) => (
            <Link
              key={play.id}
              href={`/plays#${play.id}`}
              className="group relative rounded-2xl border border-white/10 bg-white/4
                         hover:bg-white/7 hover:border-white/20 transition-all p-6 overflow-hidden"
            >
              {/* Background accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    'radial-gradient(ellipse at top right, rgba(249,115,22,0.06), transparent 70%)',
                }}
              />

              <div className="relative">
                {/* Signal badge */}
                <span className="text-[10px] font-medium text-white/35 tracking-wide">
                  {play.signal}
                </span>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  {play.name}
                </h3>
                <p className="text-sm font-medium text-white/50 mt-0.5">
                  {play.tagline}
                </p>

                <p className="mt-3 text-sm text-white/45 leading-relaxed line-clamp-2">
                  {play.description}
                </p>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-medium text-orange-500/80 group-hover:text-orange-400 transition-colors">
                  View play
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
