import { CarData } from '@/ts/interfaces';
import { NewWinner, SetState } from '@/ts/types';
import { createContext } from 'react';

interface GarageContextProps {
  cars: CarData[];
  totalCars: number;
  newWinner: NewWinner | void;
  setCurrentGaragePage: SetState<number>;
}

const defaultValue = {
  cars: [],
  totalCars: 0,
  newWinner: undefined,
  setCurrentGaragePage: () => { },
};

const GarageContext = createContext<GarageContextProps>(defaultValue);

export default GarageContext;
