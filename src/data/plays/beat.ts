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
    // ── Step 1: Initial alignment ──────────────────────────────────────────
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

    // ── Step 2: Entry ──────────────────────────────────────────────────────
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
        1: { x: 10, y: 84 }, // PG cuts to ball-side corner (player's right = screen-left)
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

    // ── Step 3: Triangle decision moment ──────────────────────────────────
    {
      id: 'triangle-formed',
      label: 'Triangle Formed',
      description:
        'The sideline triangle is set: Trigger (2) at the wing, Post (5) on the block, Corner (1) in the corner. Trail (3) and Opposite (4) hold the two-man game.',
      duration: 500,
      holdDuration: 1800,
      ballHolder: 2,
      positions: {
        1: { x: 10, y: 84 }, // Corner — ball-side corner
        2: { x: 28, y: 46 }, // Trigger on right wing
        3: { x: 58, y: 23 }, // Trail at top
        4: { x: 84, y: 60 }, // Opposite weak side
        5: { x: 36, y: 74 }, // Post ball side
      },
      playerNotes: {
        1: 'You are the corner of the triangle. Stay in the corner — 2 may hit you if the post is fronted.',
        2: 'Read in order: (1) pass directly to 5 if their defender is behind them, (2) corner pass to 1, (3) reverse to 3 at the top if nothing is there.',
        3: 'Hold the trail. You are the reverse option if 2 cannot enter to 5 or hit the corner.',
        4: 'Hold the weak-side mid-post. Flash toward the ball only if 5\'s defender fully fronts them.',
        5: 'Feel your defender. If they are behind you on the line of deployment, flash to the ball and call for the pass.',
      },
    },

    // ── Step 4: Reset Option A — no entry to 5 ────────────────────────────
    {
      id: 'reset-no-entry',
      label: 'Option A: No Entry — Rotate to Other Side',
      description:
        'Trigger (2) could not safely enter to 5. Reverse to Trail (3) at the top. Everyone pivots to set up the triangle on the player\'s left side.',
      duration: 700,
      holdDuration: 1600,
      ballHolder: 3,
      passes: [{ from: 2, to: 3 }],
      positions: {
        1: { x: 60, y: 27 }, // Rotates up to new trail/top
        2: { x: 14, y: 56 }, // Clears to player's-right weak side
        3: { x: 72, y: 40 }, // Catches, becomes new trigger on player's-left wing
        4: { x: 15, y: 65 }, // Slides to new opposite (weak-side, player's right)
        5: { x: 75, y: 70 }, // Slides to new ball-side low block (player's left)
      },
      playerNotes: {
        1: 'Rotate up to the top of the key. You become the new trail as the triangle forms on the other side.',
        2: 'After the reverse pass, clear to the player\'s-right weak side. The ball side has shifted.',
        3: 'Catch the reverse pass and move to the player\'s-left wing. You are now the trigger — read 5\'s new position and run the triangle from this side.',
        4: 'Slide to the weak-side mid-post on the player\'s right. You and 1 form the two-man game.',
        5: 'Slide to the ball-side low block on the player\'s left. Get in the line of deployment between 3 and the basket.',
      },
    },

    // ── Step 5: Primary action — post entry ───────────────────────────────
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
        1: { x: 53, y: 86 }, // PG cuts baseline from corner
        2: { x: 43, y: 60 }, // Trigger cuts above 5, sets screen for trail
        3: { x: 53, y: 49 }, // Trail cuts to high post off screen
        4: { x: 84, y: 60 }, // Opposite holds
        5: { x: 36, y: 74 }, // Post receives ball
      },
      playerNotes: {
        1: 'Cut hard along the baseline the instant 2 passes. You are coming from the corner — look for the quick return pass from 5 for a layup.',
        2: 'After the pass to 5, cut above the post and set a screen on 3\'s defender. Then clear to the weak-side corner.',
        3: 'Use 2\'s screen to cut toward the high post (free-throw line area). You may be open for the jumper.',
        4: 'Stay at the weak-side mid-post. You are the safety valve if nothing else is there.',
        5: 'Read your options in order: 1 cutting baseline from the corner, 3 at the high post, skip to 4, or reset.',
      },
    },

    // ── Step 6: Reset Option B — 5 passes to 3 at high post ──────────────
    {
      id: 'reset-3',
      label: 'Option B: 5 Hits Trail — 3 Attacks',
      description:
        '5 did not hit 1 on the baseline cut and chose not to attack. Pass to 3 at the high post. 3 can shoot, attack, or dribble to restart the triangle from the top.',
      duration: 700,
      holdDuration: 1600,
      ballHolder: 3,
      passes: [{ from: 5, to: 3 }],
      positions: {
        1: { x: 82, y: 74 }, // Clears to weak-side wing
        2: { x: 89, y: 60 }, // Clears to weak-side corner
        3: { x: 53, y: 49 }, // Receives at high post, faces up
        4: { x: 84, y: 60 }, // Holds weak-side mid-post
        5: { x: 36, y: 74 }, // Holds post, makes the pass
      },
      playerNotes: {
        1: 'Clear to the weak-side wing. You are no longer involved in this action — balance the floor.',
        2: 'Clear to the weak-side corner after screening.',
        3: 'Catch at the high post and face up. Read the defense: shoot if open, attack if your defender closes too hard, or dribble back to the top and restart the triangle.',
        4: 'Hold the weak-side mid-post. You are the skip-pass safety valve if 3 draws a double.',
        5: 'Pass to 3. Stay at the post — you are still a threat if 3 drives and kicks back inside.',
      },
    },

    // ── Step 7: Reset Option C — 5 hits 4 cutting to basket ──────────────
    {
      id: 'reset-4',
      label: 'Option C: 5 Hits Opposite — 4 Cuts',
      description:
        '5 did not hit 1 on the baseline cut. 4 reads the play and cuts hard from the weak-side mid-post toward the basket. 5 hits 4 with the pass.',
      duration: 700,
      holdDuration: 1600,
      ballHolder: 4,
      passes: [{ from: 5, to: 4 }],
      positions: {
        1: { x: 82, y: 74 }, // Clears to weak-side wing
        2: { x: 89, y: 60 }, // Clears to weak-side corner
        3: { x: 56, y: 26 }, // Resets to trail / top of key
        4: { x: 56, y: 82 }, // Cuts from weak-side mid-post toward basket
        5: { x: 36, y: 74 }, // Holds post, passes to cutting 4
      },
      playerNotes: {
        1: 'Clear to the weak-side wing.',
        2: 'Clear to the weak-side corner.',
        3: 'Reset to the top of the key. If 4\'s cut does not lead to a score, you are the outlet to restart the triangle.',
        4: 'Read 5\'s post situation. If the baseline is open, cut hard from the weak-side mid-post toward the basket — 5 will hit you. If the cut is not there, rotate back up to the trail to restart.',
        5: 'Hit 4 on the cut if the baseline is open. If not, kick out to 3 at the top and reset the triangle.',
      },
    },
  ],
};
