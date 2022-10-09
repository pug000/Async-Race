import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CarData } from 'ts/interfaces';

interface GarageState {
  isGaragePage: boolean;
  currentPage: number;
  totalPages: number;
  selectedCar: CarData | null;
  isRaceStarted: boolean;
  isDisabledSettings: boolean;
  isCarEngineStarted: number[];
}

const initialState: GarageState = {
  isGaragePage: true,
  currentPage: 1,
  totalPages: 0,
  selectedCar: null,
  isRaceStarted: false,
  isDisabledSettings: true,
  isCarEngineStarted: [],
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setGaragePage(state, actions: PayloadAction<boolean>) {
      state.isGaragePage = actions.payload;
    },

    setTotalPages(state, actions: PayloadAction<number>) {
      state.totalPages = actions.payload;
    },

    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },

    setSelectedCar(state, actions: PayloadAction<CarData | null>) {
      state.selectedCar = actions.payload;
    },

    setRaceStarted(state, actions: PayloadAction<boolean>) {
      state.isRaceStarted = actions.payload;
    },

    setDisabledSettings(state, actions: PayloadAction<boolean>) {
      state.isDisabledSettings = actions.payload;
    },

    startCarEngine(state, actions: PayloadAction<number>) {
      state.isCarEngineStarted.push(actions.payload);
    },

    stopCarEngine(state, actions: PayloadAction<number>) {
      state.isCarEngineStarted = state.isCarEngineStarted.filter(
        (id) => id !== actions.payload
      );
    },
  },
});

export const {
  setGaragePage,
  setTotalPages,
  setCurrentPage,
  setSelectedCar,
  setRaceStarted,
  setDisabledSettings,
  startCarEngine,
  stopCarEngine,
} = garageSlice.actions;

export default garageSlice.reducer;
