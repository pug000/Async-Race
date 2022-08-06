import { CarData } from '@/ts/interfaces';
import { AsyncFn, NewWinner, SetState } from '@/ts/types';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  totalCars: number;
  newWinner: NewWinner | void;
  currentGaragePage: number;
  setCurrentGaragePage: SetState<number>;
  removeCar: AsyncFn<CarData, void>;
}

const defaultValue = {
  cars: [],
  totalCars: 0,
  newWinner: undefined,
  currentGaragePage: 1,
  setCurrentGaragePage: () => { },
  removeCar: async () => { },
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
