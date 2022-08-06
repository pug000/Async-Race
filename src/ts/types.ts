import { CarData, Winner } from './interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type EventHandler<T, R> = (arg: T) => R;

export type OmitCarData = Omit<CarData, 'id'>;

export type AsyncFn<T, R> = (item: T) => Promise<R>;

export type NewWinner = Omit<Winner, 'wins' | 'color'>;
