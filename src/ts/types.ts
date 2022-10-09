import { Winner } from './interfaces';

type NewWinner = Omit<Winner, 'wins' | 'color'>;

type CreatedNewWinner = Omit<Winner, 'color' | 'name'>;

export type { NewWinner, CreatedNewWinner };
