import type { Play } from '@/types/play';

/**
 * "Horns" — Dribble Drive Motion Offense
 * Popularized by John Calipari at Memphis.
 *
 * Signal: both index fingers raised like devil horns (like Kobe's ISO signal)
 *
 * Coordinate system: x/y are 0–100 percentages of the 500×470 SVG court.
 *   Basket is at roughly (50, 91.5). Free-throw line ~(50, 59.6).
 *   Top of 3-point arc ~(50, 41). Corner-3 area ~(7, 72) and (93, 72).
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
        2: { x: 14, y: 58 },
        3: { x: 86, y: 58 },
        4: { x: 7, y: 72 },
        5: { x: 93, y: 72 },
      },
      playerNotes: {
        1: 'Flash the horns signal. Read the right lane — is your defender up high? Attack it.',
        2: 'Space to the left wing. Feet shoulder-width apart, knees bent, ready to shoot.',
        3: 'Space to the right wing. Keep your feet ready and watch the lane open.',
        4: 'Hold the left corner. Your defender will have to decide — if they sag to help, you are wide open.',
        5: 'Hold the right corner. If the drive goes left, you may be the skip-pass option.',
      },
    },

    {
      id: 'drive',
      label: 'PG Attacks Right Lane',
      description:
        'PG attacks the right lane hard. The right wing lifts toward the top to widen the gap and keep the lane clear.',
      duration: 750,
      holdDuration: 1400,
      ballHolder: 1,
      positions: {
        1: { x: 63, y: 59 },
        2: { x: 14, y: 58 },
        3: { x: 70, y: 27 },
        4: { x: 7, y: 72 },
        5: { x: 93, y: 72 },
      },
      playerNotes: {
        1: 'Attack the right lane with pace. Force the defense to make a choice — finish at the rim or kick out.',
        2: 'Hold your left wing spot. Stay ready — you are the primary kick-out target.',
        3: 'Lift toward the top of the key to clear the right lane. Stay alert for the skip pass.',
        4: 'Stay in the left corner. If the right-side help rotates, cut baseline for the dump-off.',
        5: 'Hold the right corner. Your defender may hedge toward the lane, leaving you open.',
      },
    },

    {
      id: 'collapse',
      label: 'Defense Collapses — Kick Out',
      description:
        'Two defenders collapse toward the basket. PG kicks to the open left wing for the uncontested three.',
      duration: 500,
      holdDuration: 1800,
      ballHolder: 2,
      passes: [{ from: 1, to: 2 }],
      positions: {
        1: { x: 63, y: 76 },
        2: { x: 14, y: 58 },
        3: { x: 70, y: 27 },
        4: { x: 7, y: 72 },
        5: { x: 93, y: 72 },
      },
      playerNotes: {
        1: 'Read the collapsing defense. Kick to the left wing for the open three, or lay it up if the lane is completely clear.',
        2: 'Catch and shoot. Your defender rotated — step into your shot and let it fly.',
        3: 'Stay at the top. You are the reset option if the kick-out does not happen.',
        4: 'If the left wing drives after catching, cut hard along the baseline.',
        5: 'Hold the right corner. Prepare for a skip pass if the left wing draws another defender.',
      },
    },

    {
      id: 'reset',
      label: 'Shoot or Reset',
      description:
        'Left wing shoots or swings to PG resetting at the top. The offense immediately re-spaces to five-out to run the action again.',
      duration: 700,
      holdDuration: 1400,
      ballHolder: 2,
      positions: {
        1: { x: 50, y: 35 },
        2: { x: 20, y: 51 },
        3: { x: 70, y: 27 },
        4: { x: 7, y: 72 },
        5: { x: 93, y: 72 },
      },
      playerNotes: {
        1: 'Reset to the top. Receive the swing pass and be ready to drive left this time to keep the defense honest.',
        2: 'If the shot is not there, swing to PG. Sprint back to the wing after the pass.',
        3: 'Hold the top. Slide back to the right wing once PG has the ball.',
        4: 'Hold the left corner.',
        5: 'Hold the right corner.',
      },
    },
  ],
};
