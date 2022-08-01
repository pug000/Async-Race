import { CarData } from '@/ts/interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type EventHandler<T, R> = (arg: T) => R;

export type OmitCarData = Omit<CarData, 'id' | 'isStarted'>;

export type AsyncFn<T, S, R> = (
  item: T,
  resource: S,
  method: S,
  numParam: number,
  setState?: SetState<T>,
) => Promise<R>;
