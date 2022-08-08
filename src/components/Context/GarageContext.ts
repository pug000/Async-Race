import { CarData } from '@/ts/interfaces';
import { AsyncFn, NewWinner, SetState } from '@/ts/types';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  totalCars: number;
  errorMessage: string | null;
  newWinner: NewWinner | void;
  currentGaragePage: number;
  setCurrentGaragePage: SetState<number>;
  removeCar: AsyncFn<CarData, void>;
  getNewWinner: (item: NewWinner | void) => void;
}

const defaultValue = {
  cars: [],
  totalCars: 0,
  errorMessage: null,
  newWinner: undefined,
  currentGaragePage: 1,
  setCurrentGaragePage: () => { },
  getNewWinner: () => { },
  removeCar: async () => { },
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
