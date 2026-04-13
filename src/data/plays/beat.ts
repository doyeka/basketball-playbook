import type { Play } from '@/types/play';

/**
 * "Beat" — Simplified Triangle Offense
 * Popularized by Phil Jackson (Chicago Bulls & LA Lakers).
 * We run the Inside Cut entry from a 2-2-1 formation.
 *
 * Signal: beat on your chest with a closed fist
 *
 * All positions use the PLAYER'S perspective (facing the basket, attacking downward).
 *   Player's right = screen-left (low x). Player's left = screen-right (high x).
 *   Primary action and ball side are on the player's RIGHT (screen-left, lower x values).
 *
 * Positions in the triangle (after entry):
 *   Corner (#1 after cut)    — ball-side corner       (player's right, screen-left)
 *   Trigger (#2)             — ball-side wing          (player's right, screen-left)
 *   Post (#5)                — ball-side low block     (player's right, screen-left)
 *   Trail (#3)               — top of key, weak side  (player's left,  screen-right)
 *   Opposite (#4)            — weak-side mid-post      (player's left,  screen-right)
 */
export const beat: Play = {
  id: 'beat',
  name: 'Beat',
  signal: 'Beat your chest with a closed fist',
  tagline: 'Triangle Offense',
  description:
    'Simplified version of Phil Jackson\'s Triangle. Perfect spacing plus read-and-react options out of the sideline triangle. We run the Inside Cut entry. Every player is always a threat — no one stands still.',

  players: [
    { id: 1, role: 'ballhandler', label: 'Point Guard (1)', shortLabel: '1' },
    { id: 2, role: 'wing', label: 'Guard / Trigger (2)', shortLabel: '2' },
    { id: 3, role: 'wing', label: 'Trail (3)', shortLabel: '3' },
    { id: 4, role: 'big', label: 'Opposite (4)', shortLabel: '4' },
    { id: 5, role: 'big', label: 'Post (5)', shortLabel: '5' },
  ],

  steps: [
    {
      id: 'set',
      label: 'Set — 2-2-1',
      description:
        'Two-guard front alignment. PG and 2 up top. Forwards mid-court. Post on the ball-side low block.',
      duration: 600,
      holdDuration: 1600,
      ballHolder: 1,
      positions: {
        1: { x: 65, y: 32 }, // PG — slightly left of center
        2: { x: 35, y: 32 }, // Guard/Trigger — player's right (screen-left), ball side
        3: { x: 84, y: 58 }, // Trail — player's left (screen-right), weak side
        4: { x: 84, y: 60 }, // Opposite — will slide to weak-side mid-post on entry
        5: { x: 34, y: 78 }, // Post — ball-side low block (player's right = screen-left)
      },
      playerNotes: {
        1: 'Flash the Beat signal. You are making the entry pass to 2 on the right wing, then cutting.',
        2: 'Set up on the right wing. Get ready to receive the entry pass — you become the trigger.',
        3: 'You are on the weak side. When 1 makes the entry pass, slide up to the top of the key (trail position).',
        4: 'You will set up near the weak side and slide to the opposite mid-post as 1 makes the entry pass.',
        5: 'Slide to the ball-side low block on the right. Your goal: get in a direct line between 2 and the basket (line of deployment).',
      },
    },

    {
      id: 'entry',
      label: 'Entry Pass + Inside Cut',
      description:
        'PG passes to the trigger (2) on the right wing, then cuts inside between 2 and 5 down to the ball-side corner.',
      duration: 800,
      holdDuration: 1400,
      ballHolder: 2,
      passes: [{ from: 1, to: 2 }],
      positions: {
        1: { x: 28, y: 80 }, // PG cuts to ball-side corner (player's right = screen-left)
        2: { x: 28, y: 46 }, // Trigger on right wing (player's right = screen-left)
        3: { x: 56, y: 24 }, // Trail slides to top of key
        4: { x: 84, y: 60 }, // Opposite — weak-side mid-post (player's left = screen-right)
        5: { x: 36, y: 74 }, // Post on ball-side low block
      },
      playerNotes: {
        1: 'Pass to 2 and cut hard inside — go between 2 and 5 — straight to the ball-side corner. Make it sharp.',
        2: 'Catch on the wing. You are now the trigger. Read 5\'s defender before your next pass.',
        3: 'Slide to the trail position at the top of the key as 1 makes the pass.',
        4: 'Hold the weak-side mid-post. You and 3 form the two-man game on the weak side.',
        5: 'Establish position on the high side of the low block. Stay directly between 2 and the basket.',
      },
    },

    {
      id: 'triangle-formed',
      label: 'Triangle Formed',
      description:
        'The sideline triangle is set: Trigger (2) at the wing, Post (5) on the block, Corner (1) in the corner. Trail (3) and Opposite (4) hold the two-man game.',
      duration: 500,
      holdDuration: 1800,
      ballHolder: 2,
      positions: {
        1: { x: 27, y: 81 }, // Corner
        2: { x: 28, y: 46 }, // Trigger on right wing
        3: { x: 58, y: 23 }, // Trail at top
        4: { x: 84, y: 60 }, // Opposite weak side
        5: { x: 36, y: 74 }, // Post ball side
      },
      playerNotes: {
        1: 'You are the corner of the triangle. Stay put — 2 may hit you if the post is fronted.',
        2: 'Read in order: (1) pass directly to 5 if their defender is behind them, (2) corner pass to 1, (3) reverse to 3 at the top.',
        3: 'Hold the trail. You are the reverse option if 2 swings the ball back.',
        4: 'Hold the weak-side mid-post. Flash toward the ball only if 5\'s defender fully fronts them.',
        5: 'Feel your defender. If they are behind you on the line of deployment, flash to the ball and call for the pass.',
      },
    },

    {
      id: 'post-pass',
      label: 'Post Pass + Cuts',
      description:
        'Trigger (2) passes into the post (5). PG cuts hard along the baseline. Then 2 cuts above 5 and sets a screen for the trail (3) cutting toward the high post.',
      duration: 800,
      holdDuration: 1500,
      ballHolder: 5,
      passes: [{ from: 2, to: 5 }],
      screens: [{ setter: 2, cutter: 3 }],
      positions: {
        1: { x: 53, y: 86 }, // PG cuts baseline
        2: { x: 43, y: 60 }, // Trigger cuts above 5, screens for trail
        3: { x: 53, y: 49 }, // Trail cuts to high post off screen
        4: { x: 84, y: 60 }, // Opposite holds
        5: { x: 36, y: 74 }, // Post receives ball
      },
      playerNotes: {
        1: 'Cut hard along the baseline the instant 2 passes. Look for the quick return pass from 5 for a layup.',
        2: 'After the pass to 5, cut above the post and set a screen on 3\'s defender. Then clear to the weak-side corner.',
        3: 'Use 2\'s screen to cut toward the high post (free-throw line area). You may be open for the jumper.',
        4: 'Stay at the weak-side mid-post. You are the safety valve if nothing else is there.',
        5: 'Read your options in order: 1 cutting baseline, 3 at the high post, skip to 4, or kick back to 3 at the top.',
      },
    },

    {
      id: 'finish',
      label: 'Finish or Continue',
      description:
        '5 attacks the post, hits the cutting 1, or passes to 3 at the high post. If nothing is there, swing to 3 at the top and reset the offense.',
      duration: 700,
      holdDuration: 1500,
      ballHolder: 5,
      positions: {
        1: { x: 82, y: 76 }, // PG cleared to weak side
        2: { x: 89, y: 63 }, // Trigger cleared to weak-side corner
        3: { x: 53, y: 53 }, // Trail at high post / free-throw line
        4: { x: 84, y: 60 }, // Opposite holds
        5: { x: 36, y: 74 }, // Post has ball, reads
      },
      playerNotes: {
        1: 'If you did not receive the baseline pass, clear to the weak-side wing to balance the floor.',
        2: 'After screening, you have cleared to the weak-side corner. Stay ready.',
        3: 'You are open at the high post. Call for the ball. Catch-and-face, then attack or shoot.',
        4: 'Hold your position and provide balance. If nothing develops, be ready to reset.',
        5: 'Attack from the post if you have an advantage. Otherwise kick to 3 at the high post or swing to the top to run the offense again.',
      },
    },
  ],
};
