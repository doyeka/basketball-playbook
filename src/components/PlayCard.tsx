'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play as PlayIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import CourtDiagram from './CourtDiagram';
import type { Play, PlayerId } from '@/types/play';
import { cn } from '@/lib/utils';

const ROLE_LABEL_COLOR: Record<string, string> = {
  ballhandler: 'text-orange-400',
  wing: 'text-sky-400',
  big: 'text-violet-400',
  shooter: 'text-green-400',
};

const ROLE_BG_COLOR: Record<string, string> = {
  ballhandler: 'bg-orange-500/20 border-orange-500/30',
  wing: 'bg-sky-500/20 border-sky-500/30',
  big: 'bg-violet-500/20 border-violet-500/30',
  shooter: 'bg-green-500/20 border-green-500/30',
};

interface PlayCardProps {
  play: Play;
}

export default function PlayCard({ play }: PlayCardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance — only when not paused
  useEffect(() => {
    if (isPaused) return;
    const step = play.steps[currentStep];
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % play.steps.length);
    }, step.duration + step.holdDuration);
    return () => clearTimeout(timer);
  }, [currentStep, isPaused, play.steps]);

  function prev() {
    setCurrentStep((s) => (s - 1 + play.steps.length) % play.steps.length);
  }
  function next() {
    setCurrentStep((s) => (s + 1) % play.steps.length);
  }

  const step = play.steps[currentStep];

  return (
    <article
      id={play.id}
      className="rounded-2xl border border-white/8 bg-white/4 overflow-hidden"
    >
      {/* Play header */}
      <header className="px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {play.name}
            </h2>
            <p className="text-sm text-white/50 mt-0.5">{play.tagline}</p>
          </div>
          <span className="ml-auto text-xs font-medium text-white/40 bg-white/6 border border-white/10 rounded-full px-3 py-1">
            {play.signal}
          </span>
        </div>
        <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-2xl">
          {play.description}
        </p>
      </header>

      {/* Main layout: diagram left (desktop) or top (mobile) */}
      <div className="flex flex-col lg:flex-row">
        {/* ── Diagram + controls ── */}
        <div className="lg:w-[58%] flex flex-col bg-black/20">
          {/* Playback controls bar */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            {/* Prev / Play-Pause / Next */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prev}
                aria-label="Previous step"
                className="flex items-center justify-center w-7 h-7 rounded-full
                           text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => setIsPaused((p) => !p)}
                aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full transition-colors',
                  isPaused
                    ? 'bg-orange-500 text-white hover:bg-orange-400'
                    : 'bg-white/10 text-white/70 hover:bg-white/18 hover:text-white',
                )}
              >
                {isPaused ? <PlayIcon size={14} className="translate-x-px" /> : <Pause size={14} />}
              </button>

              <button
                onClick={next}
                aria-label="Next step"
                className="flex items-center justify-center w-7 h-7 rounded-full
                           text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Status label */}
            <span className="text-[11px] text-white/30">
              {isPaused ? 'paused' : 'playing'}
            </span>
          </div>

          {/* Court */}
          <div className="p-4 pt-1 flex items-center justify-center">
            <div className="w-full max-w-lg aspect-[500/470]">
              <CourtDiagram play={play} currentStep={currentStep} />
            </div>
          </div>
        </div>

        {/* ── Instructions panel ── */}
        <div className="lg:w-[42%] flex flex-col border-t border-white/8 lg:border-t-0 lg:border-l lg:border-white/8">
          {/* Step progress + label */}
          <div className="px-5 pt-4 pb-3 border-b border-white/8">
            {/* Step dots */}
            <div className="flex items-center gap-2 mb-3">
              {play.steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(i)}
                  aria-label={`Step ${i + 1}: ${s.label}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                    i === currentStep
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/25 hover:bg-white/50',
                  )}
                />
              ))}
              <span className="ml-auto text-xs text-white/40">
                {currentStep + 1} / {play.steps.length}
              </span>
            </div>

            {/* Animated step label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-base font-semibold text-white">
                  {step.label}
                </h3>
                <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Player notes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5"
              >
                {play.players.map((player) => {
                  const isBallHolder = step.ballHolder === player.id;
                  return (
                    <div
                      key={player.id}
                      className={cn(
                        'rounded-lg border px-3.5 py-2.5 transition-all',
                        isBallHolder
                          ? ROLE_BG_COLOR[player.role]
                          : 'bg-white/3 border-white/8',
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={cn(
                            'text-xs font-bold',
                            ROLE_LABEL_COLOR[player.role],
                          )}
                        >
                          {player.shortLabel}
                        </span>
                        <span className="text-xs text-white/40">
                          {player.label}
                        </span>
                        {isBallHolder && (
                          <span className="ml-auto text-[10px] font-medium text-orange-400 bg-orange-500/15 rounded-full px-2 py-0.5">
                            ball
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {step.playerNotes[player.id as PlayerId]}
                      </p>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </article>
  );
}
