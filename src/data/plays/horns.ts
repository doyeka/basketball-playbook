import type { Play } from '@/types/play';

/**
 * "Horns" — Dribble Drive Motion Offense
 * Popularized by John Calipari at Memphis.
 *
 * Signal: both index fingers raised like devil horns (like Kobe's ISO signal)
 *
 * Coordinate system: x/y are 0–100 percentages of the 500×470 SVG court.
 *   All positions use the PLAYER'S perspective (facing the basket, attacking downward).
 *   Player's right = screen-left (low x). Player's left = screen-right (high x).
 *   Basket is at roughly (50, 91.5). Free-throw line ~(50, 59.6).
 *   Top of 3-point arc ~(50, 41). Corner-3 area ~(7, 72) and (93, 72).
 *   Primary action drives toward lower x (player's right, screen-left).
 */
export const horns: Play = {
  id: 'horns',
  name: 'Horns',
  signal: 'Both index fingers raised like horns (Kobe ISO signal)',
  tagline: 'Dribble Drive Motion',
  description:
    'Popularized by John Calipari at Memphis. Five-out spacing clears the lane for the ball handler to attack aggressively. When the defense collapses, shooters on the perimeter are left wide open.',

  players: [
    { id: 1, role: 'ballhandler', label: 'Point Guard', shortLabel: 'PG' },
    { id: 2, role: 'wing', label: 'Left Wing', shortLabel: 'LW' },
    { id: 3, role: 'wing', label: 'Right Wing', shortLabel: 'RW' },
    { id: 4, role: 'shooter', label: 'Left Corner', shortLabel: 'LC' },
    { id: 5, role: 'shooter', label: 'Right Corner', shortLabel: 'RC' },
  ],

  steps: [
    // ── Step 1: Initial alignment ──────────────────────────────────────────
    {
      id: 'set',
      label: 'Set — Five Out',
      description:
        'Five-out spacing. All four perimeter players spread wide, creating a clear driving lane for the ball handler.',
      duration: 600,
      holdDuration: 1600,
      ballHolder: 1,
      positions: {
        1: { x: 50, y: 35 },
        2: { x: 86, y: 58 }, // Left Wing  — player's left = screen-right
        3: { x: 14, y: 58 }, // Right Wing — player's right = screen-left
        4: { x: 93, y: 72 }, // Left Corner  — player's left = screen-right
        5: { x: 7,  y: 72 }, // Right Corner — player's right = screen-left
      },
      playerNotes: {
        1: 'Flash the horns signal. Read the right lane — is your defender up high? Attack it.',
        2: 'Space to the left wing. Feet shoulder-width apart, knees bent, ready to shoot.',
        3: 'Space to the right wing. Keep your feet ready and watch the lane open.',
        4: 'Hold the left corner. Your defender will have to decide — if they sag to help, you are wide open.',
        5: 'Hold the right corner. The drive comes to your side — your defender will likely help, leaving you open for the kick-back.',
      },
    },

    // ── Step 2: Primary action ─────────────────────────────────────────────
    {
      id: 'drive',
      label: 'PG Attacks Right Lane',
      description:
        'PG attacks the right lane hard. The right wing lifts toward the top to widen the gap and keep the lane clear.',
      duration: 750,
      holdDuration: 1400,
      ballHolder: 1,
      positions: {
        1: { x: 37, y: 59 }, // PG driving right lane (screen-left = player's right)
        2: { x: 86, y: 58 }, // Left Wing holds
        3: { x: 30, y: 27 }, // Right Wing lifts to top (screen-left = player's right)
        4: { x: 93, y: 72 }, // Left Corner holds
        5: { x: 7,  y: 72 }, // Right Corner holds
      },
      playerNotes: {
        1: 'Attack the right lane with pace. Force the defense to make a choice — finish at the rim or kick out.',
        2: 'Hold your left wing spot. Stay ready — you are the primary kick-out target.',
        3: 'Lift toward the top of the key to clear the right lane. Stay alert for the skip pass.',
        4: 'Stay in the left corner. If the defense collapses on the drive, you may get a baseline dump-off.',
        5: 'Hold the right corner. The PG may drive past your area — look for the kick-back when your defender commits to stop the drive.',
      },
    },

    // ── Step 3: Decision moment ────────────────────────────────────────────
    {
      id: 'collapse-reads',
      label: 'Defense Collapses — PG Reads',
      description:
        'Two defenders collapse toward the basket. PG has the ball and reads the defense: kick to LW, swing to RW, or hit the corner.',
      duration: 500,
      holdDuration: 1800,
      ballHolder: 1,
      positions: {
        1: { x: 37, y: 76 }, // PG near basket — ball in hand, reading
        2: { x: 86, y: 58 }, // Left Wing — primary kick-out target
        3: { x: 30, y: 27 }, // Right Wing at top — safety valve
        4: { x: 93, y: 72 }, // Left Corner
        5: { x: 7,  y: 72 }, // Right Corner
      },
      playerNotes: {
        1: 'Read the collapse. Three options: kick to LW for the open three (primary), swing to RW to reset (no shot available), or hit the corner (their defender helped).',
        2: 'Catch and shoot if the pass comes. Your defender has rotated — be ready to step into your shot immediately.',
        3: 'Stay at the top. If the kick-out to LW is not there, you are the safety valve — PG will swing it to you.',
        4: 'Hold the left corner. If LW drives after catching, cut hard along the baseline.',
        5: 'Hold the right corner. If your defender helps on the drive, you could be open for the kick-back.',
      },
    },

    // ── Step 4: Reset Option A ─────────────────────────────────────────────
    {
      id: 'reset-rw',
      label: 'Option A: Swing to RW — RW Takes Over',
      description:
        'Kick-out to LW is not available. PG swings the ball to RW at the top. RW becomes the new ball handler and resets the offense.',
      duration: 650,
      holdDuration: 1600,
      ballHolder: 3,
      passes: [{ from: 1, to: 3 }],
      positions: {
        1: { x: 14, y: 58 }, // PG drops to right wing (fills RW's old spot)
        2: { x: 86, y: 58 }, // Left Wing holds
        3: { x: 30, y: 27 }, // RW receives at top — new ball handler
        4: { x: 93, y: 72 }, // Left Corner holds
        5: { x: 7,  y: 72 }, // Right Corner holds
      },
      playerNotes: {
        1: 'If the kick-out is not there, pull up and swing to RW at the top. Drop to the right wing — you are now the right wing on the next rep.',
        2: 'Hold the left wing. Stay ready to be the kick-out target for the new ball handler.',
        3: 'Catch at the top — you are now the ball handler. Read the defense, attack the right lane, and run the play again.',
        4: 'Hold the left corner.',
        5: 'Hold the right corner.',
      },
    },

    // ── Step 5: Reset Option B ─────────────────────────────────────────────
    {
      id: 'reset-lw',
      label: 'Option B: Kick-Out to LW — LW Becomes PG',
      description:
        'PG kicks to LW. LW catches but the shot is not there. LW dribbles up to become the new ball handler. PG rotates to LW\'s wing.',
      duration: 700,
      holdDuration: 1600,
      ballHolder: 2,
      passes: [{ from: 1, to: 2 }],
      positions: {
        1: { x: 86, y: 62 }, // PG rotates to LW's old left wing spot
        2: { x: 50, y: 35 }, // LW dribbles to top — new PG
        3: { x: 14, y: 58 }, // RW returns to right wing
        4: { x: 93, y: 72 }, // Left Corner holds
        5: { x: 7,  y: 72 }, // Right Corner holds
      },
      playerNotes: {
        1: 'Rotate to LW\'s old left wing spot. You are now the left wing on the next rep.',
        2: 'Catch the kick-out. If the shot is not there, dribble up to the top and become the new ball handler. Attack the right lane on the next rep.',
        3: 'Slide back to the right wing as LW rotates to the top.',
        4: 'Hold the left corner.',
        5: 'Hold the right corner.',
      },
    },

    // ── Step 6: Reset Option C ─────────────────────────────────────────────
    {
      id: 'reset-corner',
      label: 'Option C: Hit the Corner — Redistribute',
      description:
        'PG hits RC in the right corner. Corner\'s defender helped on the drive, leaving them open. RC looks for the outlet and everyone rotates back to five-out.',
      duration: 700,
      holdDuration: 1600,
      ballHolder: 5,
      passes: [{ from: 1, to: 5 }],
      positions: {
        1: { x: 50, y: 35 }, // PG resets to top of key
        2: { x: 86, y: 58 }, // Left Wing holds
        3: { x: 14, y: 58 }, // RW returns to right wing
        4: { x: 93, y: 72 }, // Left Corner holds
        5: { x: 7,  y: 72 }, // Right Corner — has ball, reads outlet
      },
      playerNotes: {
        1: 'After the pass, sprint back to the top of the key. Be ready to receive the outlet and attack again.',
        2: 'Hold the left wing. You are the first outlet option for the corner.',
        3: 'Return to the right wing.',
        4: 'Hold the left corner.',
        5: 'Catch the pass. Read your options: shoot if open, kick to LW on the wing, or swing to PG at the top to reset the play.',
      },
    },
  ],
};
