<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:playbook-conventions -->
## Playbook Conventions

These rules apply to every play definition in `src/data/plays/`. They must be followed when editing existing plays or creating new ones.

### Court Orientation

The SVG court (`CourtDiagram.tsx`) is a top-down overhead view with:
- **Baseline** at the bottom (y ≈ 91.5% of the 500×470 viewBox)
- **Half-court line** at the top (y = 0%)
- **Basket** at (50%, 91.5%)
- **Players attack downward** — they face the basket, which is at the bottom of the diagram

### Player Perspective Rule

**All labels, descriptions, and `playerNotes` use the player's on-court perspective, not the viewer's.**

Because players face downward toward the basket:

```
Player faces ↓ toward basket

Screen LEFT  (low x)   =  Player's RIGHT hand side
Screen RIGHT (high x)  =  Player's LEFT hand side
```

| On-screen position | Player's perspective | Correct label |
|--------------------|----------------------|---------------|
| low x (screen-left)  | player's right side  | "Right Wing", "Right Corner" |
| high x (screen-right) | player's left side  | "Left Wing", "Left Corner"  |

A player token sitting at x=14% is on the player's **right** — label it "Right Wing" (shortLabel: `RW`), not "Left Wing."

### Primary Action Direction

The first / primary action in every play must drive toward **lower x values** (screen-left = player's right). This keeps the default attack going to the player's right, matching the right-handed dominant play style of the team.

- Correct: PG drives from x=50 → x=37 (screen-left, player's right) ✓
- Wrong:   PG drives from x=50 → x=63 (screen-right, player's left) ✗

### Coordinate System

```
x: 0–100% of SVG width (500px)
  0   = left sideline
  50  = center
  100 = right sideline

y: 0–100% of SVG height (470px)
  0   = half-court line (top of view)
  100 = baseline (bottom of view)
```

Key reference points:
- Basket:             (50, 91.5)
- Free-throw line:    (50, 59.6)
- Top of 3-point arc: (50, 41.0)
- Left corner-3:      ( 7, 72)   ← screen-left = player's RIGHT corner
- Right corner-3:     (93, 72)   ← screen-right = player's LEFT corner

### Adding a New Play

1. Create `src/data/plays/<id>.ts` following the `Play` interface in `src/types/play.ts`.
2. Define starting positions with the **primary action toward lower x** (player's right).
3. Label wings/corners from the **player's perspective** (see table above).
4. Write `playerNotes` using player-perspective directions ("your right," "your left") — never screen directions ("screen-left," "screen-right").
5. Register the play by adding it to the `plays` array in `src/data/index.ts`. The homepage and plays page pick it up automatically — no other changes needed.
<!-- END:playbook-conventions -->
