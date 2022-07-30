import { CarData } from './interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type EventHandler<T, R> = (arg: T) => R;

export type OmitCarDataId = Omit<CarData, 'id'>;

export type AsyncFn<T, S, R> = (
  item: T,
  resource: S,
  method: S,
  numParam: number,
  setState?: SetState<T>,
) => Promise<R>;
