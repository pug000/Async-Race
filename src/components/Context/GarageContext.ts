import { CarData } from '@/ts/interfaces';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  isGarageLoading: boolean;
  totalCars: number;
}

const defaultValue = {
  cars: [],
  isGarageLoading: false,
  totalCars: 0,
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
