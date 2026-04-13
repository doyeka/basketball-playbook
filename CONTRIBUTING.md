# Contributing to the Oyeka Labs Playbook

## Ethos

This playbook is a teaching tool first. Every diagram must be immediately legible on a phone screen, and every player note must read from the **player's perspective** — not the viewer's. If a teammate can't follow a step during a timeout, it isn't clear enough.

All court orientation, coordinate system, and player-perspective conventions are documented in [AGENTS.md](AGENTS.md). Read that file before writing or editing any play data.

---

## Branching

1. Branch off `main` using the naming convention `feature/<feature-name>`, with words separated by `-`:
   ```
   feature/horns-corner-reset
   feature/princeton-offense
   feature/play-search-filter
   ```
2. Make your changes and commit with a clear message.
3. Push the branch and open a Pull Request targeting `main`.
4. Request review from `@doyeka`.

> Feature branches are **not** automatically deployed to Vercel — only `main` deploys.

---

## Local Development

**Prerequisites:**
- Node.js >= 20
- A package manager — `pnpm` is preferred, but `npm` and `yarn` work fine

**Setup:**
```bash
pnpm install   # or: npm install / yarn install
pnpm dev       # starts the dev server at http://localhost:3000
```

**Before opening a PR, verify a clean build:**
```bash
pnpm build      # full Next.js production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint
```

---

## Pre-commit Hooks

This repo uses [Lefthook](https://github.com/evilmartians/lefthook) to run checks automatically before every commit.

**Install Lefthook once:**
```bash
brew install lefthook
lefthook install
```

On every `git commit`, three checks run against changed TypeScript/JavaScript files:

| Hook | What it does |
|---|---|
| `lint` | Runs ESLint |
| `tsc` | Runs `tsc --noEmit` to catch type errors |
| `style-checks` | Bans `@ts-nocheck` and enforces `@/` absolute imports (no relative `../` imports) |

Fix any failures before pushing.

---

## Adding a New Play

See the **Adding a New Play** checklist in [AGENTS.md](AGENTS.md) for the full step-by-step. The short version:

1. Create `src/data/plays/<id>.ts` following the `Play` interface in `src/types/play.ts`.
2. Register it in `src/data/index.ts`.
3. The homepage and plays page pick it up automatically — no other changes needed.
