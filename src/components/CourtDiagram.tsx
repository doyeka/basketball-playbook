'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Play, PlayerId, PlayerRole } from '@/types/play';

// ─── SVG Court Constants ───────────────────────────────────────────────────
// viewBox: "0 0 500 470". Scale: ~10px per foot (50-ft wide × 47-ft deep half court).
const W = 500;
const H = 470;

// Court markings (all in SVG units)
const BASELINE_Y = 450;
const BASKET_CX = 250;
const BASKET_CY = 420;
const BASKET_R = 12;
const BACKBOARD_Y = 402;
const RESTRICTED_R = 40;

const LANE_LEFT = 170;
const LANE_RIGHT = 330;
const LANE_TOP = 270; // free-throw line y

const FT_CX = 250;
const FT_CY = 270;
const FT_R = 62;

// 3-point line: arc center = basket, R ≈ 238 (23.8 ft)
// Corner straights run from baseline to y=340 at x=30 and x=470
const THREE_R = 238;
const THREE_ARC_Y = 341; // where corner straight meets the arc

const PLAYER_R = 18;

// ─── Color Map ─────────────────────────────────────────────────────────────
const ROLE_COLOR: Record<PlayerRole, string> = {
  ballhandler: '#f97316', // orange
  wing: '#38bdf8',        // sky blue
  big: '#a78bfa',         // violet
  shooter: '#4ade80',     // green
};

// ─── Helpers ───────────────────────────────────────────────────────────────
function toSvgX(pct: number) {
  return (pct / 100) * W;
}
function toSvgY(pct: number) {
  return (pct / 100) * H;
}

/** Shorten line endpoints so arrows don't overlap player circles */
function shortenLine(
  x1: number, y1: number,
  x2: number, y2: number,
  inset1 = PLAYER_R + 2,
  inset2 = PLAYER_R + 6,
) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return { x1, y1, x2, y2 };
  const nx = dx / len;
  const ny = dy / len;
  return {
    x1: x1 + nx * inset1,
    y1: y1 + ny * inset1,
    x2: x2 - nx * inset2,
    y2: y2 - ny * inset2,
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────

function CourtMarkings() {
  return (
    <g>
      {/* Court fill */}
      <rect x={0} y={0} width={W} height={H} fill="#c8861a" />

      {/* Half-court hash line at top */}
      <line x1={0} y1={0} x2={W} y2={0} stroke="rgba(255,255,255,0.5)" strokeWidth={2} />

      {/* Sidelines */}
      <line x1={0} y1={0} x2={0} y2={BASELINE_Y} stroke="rgba(255,255,255,0.7)" strokeWidth={2} />
      <line x1={W} y1={0} x2={W} y2={BASELINE_Y} stroke="rgba(255,255,255,0.7)" strokeWidth={2} />

      {/* Baseline */}
      <line x1={0} y1={BASELINE_Y} x2={W} y2={BASELINE_Y} stroke="rgba(255,255,255,0.7)" strokeWidth={2} />

      {/* Lane / paint */}
      <rect
        x={LANE_LEFT} y={LANE_TOP}
        width={LANE_RIGHT - LANE_LEFT} height={BASELINE_Y - LANE_TOP}
        fill="rgba(0,0,0,0.18)" stroke="rgba(255,255,255,0.7)" strokeWidth={2}
      />

      {/* Free-throw circle — upper solid half */}
      <path
        d={`M ${FT_CX - FT_R} ${FT_CY} A ${FT_R} ${FT_R} 0 0 1 ${FT_CX + FT_R} ${FT_CY}`}
        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2}
      />
      {/* Free-throw circle — lower dashed half */}
      <path
        d={`M ${FT_CX - FT_R} ${FT_CY} A ${FT_R} ${FT_R} 0 0 0 ${FT_CX + FT_R} ${FT_CY}`}
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="6 5"
      />

      {/* 3-point line: left corner straight + arc + right corner straight */}
      <path
        d={`M 30 ${BASELINE_Y} L 30 ${THREE_ARC_Y} A ${THREE_R} ${THREE_R} 0 0 1 470 ${THREE_ARC_Y} L 470 ${BASELINE_Y}`}
        fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={2}
      />

      {/* Restricted area arc */}
      <path
        d={`M ${BASKET_CX - RESTRICTED_R} ${BASKET_CY} A ${RESTRICTED_R} ${RESTRICTED_R} 0 0 1 ${BASKET_CX + RESTRICTED_R} ${BASKET_CY}`}
        fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5}
      />

      {/* Backboard */}
      <line
        x1={BASKET_CX - 28} y1={BACKBOARD_Y}
        x2={BASKET_CX + 28} y2={BACKBOARD_Y}
        stroke="rgba(255,255,255,0.9)" strokeWidth={4} strokeLinecap="round"
      />

      {/* Basket ring */}
      <circle
        cx={BASKET_CX} cy={BASKET_CY} r={BASKET_R}
        fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth={2.5}
      />
    </g>
  );
}

interface PassLinesProps {
  play: Play;
  stepIndex: number;
}

function PassLines({ play, stepIndex }: PassLinesProps) {
  const step = play.steps[stepIndex];
  if (!step.passes?.length) return null;

  return (
    <AnimatePresence>
      {step.passes.map((pass) => {
        const from = step.positions[pass.from];
        const to = step.positions[pass.to];
        const { x1, y1, x2, y2 } = shortenLine(
          toSvgX(from.x), toSvgY(from.y),
          toSvgX(to.x), toSvgY(to.y),
        );

        return (
          <motion.line
            key={`${stepIndex}-${pass.from}-${pass.to}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.92 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          />
        );
      })}
    </AnimatePresence>
  );
}

interface ScreenLinesProps {
  play: Play;
  stepIndex: number;
}

function ScreenLines({ play, stepIndex }: ScreenLinesProps) {
  const step = play.steps[stepIndex];
  if (!step.screens?.length) return null;

  return (
    <AnimatePresence>
      {step.screens.map((screen) => {
        const setter = step.positions[screen.setter];
        const cutter = step.positions[screen.cutter];
        const sx = toSvgX(setter.x);
        const sy = toSvgY(setter.y);
        const cx = toSvgX(cutter.x);
        const cy = toSvgY(cutter.y);
        // Perpendicular to the setter→cutter direction — the "wall" of the screen
        const dx = cx - sx;
        const dy = cy - sy;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 1) return null;
        const px = (-dy / len) * 16; // half bar length = 16 SVG units
        const py = (dx / len) * 16;

        return (
          <motion.line
            key={`screen-${stepIndex}-${screen.setter}-${screen.cutter}`}
            x1={sx - px} y1={sy - py}
            x2={sx + px} y2={sy + py}
            stroke="white"
            strokeWidth={4.5}
            strokeLinecap="square"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          />
        );
      })}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

interface CourtDiagramProps {
  play: Play;
  currentStep: number;
}

export default function CourtDiagram({ play, currentStep }: CourtDiagramProps) {
  const step = play.steps[currentStep];
  const step0 = play.steps[0];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-full rounded-xl"
      style={{ background: '#c8861a' }}
      aria-label={`${play.name} play diagram`}
    >
      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="9"
          markerHeight="7"
          refX="8"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 9 3.5, 0 7" fill="white" opacity={0.92} />
        </marker>
      </defs>

      <CourtMarkings />
      <PassLines play={play} stepIndex={currentStep} />
      <ScreenLines play={play} stepIndex={currentStep} />

      {/* Player tokens */}
      {play.players.map((player) => {
        const color = ROLE_COLOR[player.role];
        const isBallHolder = step.ballHolder === player.id;
        const svgX0 = toSvgX(step0.positions[player.id].x);
        const svgY0 = toSvgY(step0.positions[player.id].y);
        const svgX = toSvgX(step.positions[player.id].x);
        const svgY = toSvgY(step.positions[player.id].y);

        return (
          <motion.g
            key={player.id}
            initial={{ x: svgX0, y: svgY0 }}
            animate={{ x: svgX, y: svgY }}
            transition={{ duration: step.duration / 1000, ease: 'easeInOut' }}
          >
            {/* Glow ring for ball holder */}
            {isBallHolder && (
              <circle
                cx={0} cy={0}
                r={PLAYER_R + 5}
                fill="none"
                stroke={color}
                strokeWidth={2.5}
                opacity={0.5}
              />
            )}

            {/* Player circle */}
            <circle
              cx={0} cy={0}
              r={PLAYER_R}
              fill={color}
              stroke="white"
              strokeWidth={2}
            />

            {/* Short label */}
            <text
              x={0} y={0}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={11}
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
              fill="#000"
            >
              {player.shortLabel}
            </text>

            {/* Ball dot */}
            {isBallHolder && (
              <circle cx={PLAYER_R - 4} cy={-(PLAYER_R - 4)} r={5} fill="#f97316" stroke="white" strokeWidth={1.5} />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
