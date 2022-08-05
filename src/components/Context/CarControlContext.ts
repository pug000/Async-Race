import { CarData } from '@/ts/interfaces';
import { AsyncFn, NewWinner, OmitCarData } from '@/ts/types';
import { createContext } from 'react';

interface CarContorlContextProps {
  cars: CarData[];
  addNewCar: AsyncFn<CarData | OmitCarData, void>;
  updateSelectedCar: AsyncFn<CarData, void>;
  getNewWinner: (item: NewWinner | void) => void;
}

const defaultValue = {
  cars: [],
  addNewCar: async () => { },
  updateSelectedCar: async () => { },
  getNewWinner: () => { },
};

const GarageContext = createContext<CarContorlContextProps>(defaultValue);

export default GarageContext;
