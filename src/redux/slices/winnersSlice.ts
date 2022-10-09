import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortFields, Winner } from 'ts/interfaces';
import { NewWinner } from 'ts/types';

interface WinnersState {
  winners: Winner[];
  currentPage: number;
  totalPages: number;
  newWinner: NewWinner | undefined;
  sortFields: SortFields;
}

const initialState: WinnersState = {
  winners: [],
  currentPage: 1,
  totalPages: 0,
  newWinner: undefined,
  sortFields: {
    type: 'id',
    order: 'ASC',
  },
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setWinners(state, actions: PayloadAction<Winner[]>) {
      state.winners = actions.payload;
    },

    setCurrentPage(state, actions: PayloadAction<number>) {
      state.currentPage = actions.payload;
    },

    setTotalPages(state, actions: PayloadAction<number>) {
      state.totalPages = actions.payload;
    },

    setNewWinner(state, actions: PayloadAction<NewWinner | undefined>) {
      state.newWinner = actions.payload;
    },

    setSortFields(state, actions: PayloadAction<string>) {
      state.sortFields = {
        type: actions.payload,
        order: state.sortFields.order === 'ASC' ? 'DESC' : 'ASC',
      };
    },
  },
});

export const {
  setWinners,
  setCurrentPage,
  setTotalPages,
  setNewWinner,
  setSortFields,
} = winnersSlice.actions;

export default winnersSlice.reducer;
