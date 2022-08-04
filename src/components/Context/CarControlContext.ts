import { CarData, Winner } from '@/ts/interfaces';
import { AsyncFn, OmitCarData } from '@/ts/types';
import { createContext } from 'react';

interface CarContorlContextProps {
  cars: CarData[];
  addNewCar: AsyncFn<CarData | OmitCarData, string, void>;
  updateSelectedCar: AsyncFn<CarData, string, void>;
  getWinner: (item: Winner | void) => void;
}

const defaultValue = {
  cars: [],
  addNewCar: async () => { },
  updateSelectedCar: async () => { },
  getWinner: () => { },
};

const GarageContext = createContext<CarContorlContextProps>(defaultValue);

export default GarageContext;
