import { CarData } from '@/ts/interfaces';
import { AsyncFn, OmitCarData } from '@/ts/types';
import { createContext } from 'react';

interface CarContorlContextProps {
  addNewCar: AsyncFn<CarData | OmitCarData, string, void>;
  updateSelectedCar: AsyncFn<CarData, string, void>;
}

const defaultValue = {
  addNewCar: async () => { },
  updateSelectedCar: async () => { },
};

const GarageContext = createContext<CarContorlContextProps>(defaultValue);

export default GarageContext;
