export type PlayerId = 1 | 2 | 3 | 4 | 5;

export type PlayerRole = 'ballhandler' | 'wing' | 'big' | 'shooter';

export interface PlayerDef {
  id: PlayerId;
  role: PlayerRole;
  label: string;
  shortLabel: string;
}

export interface Position {
  /** 0–100, percentage of SVG court width */
  x: number;
  /** 0–100, percentage of SVG court height (0 = half-court, 100 = baseline) */
  y: number;
}

export interface PassAction {
  from: PlayerId;
  to: PlayerId;
}

export interface ScreenAction {
  setter: PlayerId;
  cutter: PlayerId;
}

export interface PlayStep {
  id: string;
  label: string;
  description: string;
  /** Framer Motion transition duration (ms) */
  duration: number;
  /** How long to hold the frame before advancing (ms) */
  holdDuration: number;
  positions: Record<PlayerId, Position>;
  passes?: PassAction[];
  screens?: ScreenAction[];
  ballHolder: PlayerId;
  playerNotes: Record<PlayerId, string>;
}

export interface Play {
  id: string;
  name: string;
  /** Hand-signal description */
  signal: string;
  tagline: string;
  description: string;
  players: PlayerDef[];
  steps: PlayStep[];
}
