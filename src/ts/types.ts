import { CarData, ResponseObject, Winner } from './interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type EventHandler<T, R> = (arg: T) => R;

export type OmitCarData = Omit<CarData, 'id'>;

export type AsyncFn<T, S, R> = (
  item: T,
  resource: S,
  method: S,
  numParam: number,
  setState?: SetState<T>,
) => Promise<R>;

export type WinnerWithCar = Winner & { car: CarData };

export type MergeResponseObject = Omit<ResponseObject, 'data'> & { data: WinnerWithCar[] };
