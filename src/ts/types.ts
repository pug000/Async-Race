import { CarData } from './interfaces';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type OmitCarData<K extends keyof CarData> = Omit<CarData, K>;
