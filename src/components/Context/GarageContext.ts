import { CarData, Winner } from '@/ts/interfaces';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  totalCars: number;
  winner: Winner | void;
}

const defaultValue = {
  cars: [],
  totalCars: 0,
  winner: undefined,
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
