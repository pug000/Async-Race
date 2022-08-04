import { CarData, NewWinner } from '@/ts/interfaces';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  totalCars: number;
  newWinner: NewWinner | void;
}

const defaultValue = {
  cars: [],
  totalCars: 0,
  newWinner: undefined,
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
