import { CarData, Winner } from './interfaces';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type EventHandler<T, R> = (arg: T) => R;

type OmitCarData = Omit<CarData, 'id'>;

type AsyncFn<T, R> = (item: T) => Promise<R>;

type NewWinner = Omit<Winner, 'wins' | 'color'>;

export type { SetState, EventHandler, OmitCarData, AsyncFn, NewWinner };
