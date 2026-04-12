import { horns } from './plays/horns';
import { beat } from './plays/beat';
import type { Play } from '@/types/play';

export const plays: Play[] = [horns, beat];

export { horns, beat };
