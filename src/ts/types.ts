import { CarData } from './interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type EventHandler<T, R> = (arg: T) => R;

export type OmitCarDataId = Omit<CarData, 'id'>;
