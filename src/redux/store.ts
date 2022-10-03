import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  garage: () => {},
  winners: () => {},
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
