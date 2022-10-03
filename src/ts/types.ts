import store from 'redux/store';

import { CarData, Winner } from './interfaces';

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

type EventHandler<T, R> = (arg: T) => R;

type OmitCarData = Omit<CarData, 'id'>;

type AsyncFn<T, R> = (item: T) => Promise<R>;

type NewWinner = Omit<Winner, 'wins' | 'color'>;

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type {
  SetState,
  EventHandler,
  OmitCarData,
  AsyncFn,
  NewWinner,
  RootState,
  AppDispatch,
};
