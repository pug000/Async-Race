import { combineReducers, configureStore } from '@reduxjs/toolkit';

import engineApi from './services/engineService';
import garageApi from './services/garageService';
import winnersApi from './services/winnersService';
import garageSlice from './slices/garageSlice';
import winnersSlice from './slices/winnersSlice';

const rootReducer = combineReducers({
  garage: garageSlice,
  winners: winnersSlice,
  [garageApi.reducerPath]: garageApi.reducer,
  [winnersApi.reducerPath]: winnersApi.reducer,
  [engineApi.reducerPath]: engineApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      garageApi.middleware,
      winnersApi.middleware,
      engineApi.middleware,
    ]),
});

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };
export default store;
