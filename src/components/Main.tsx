import React, {
  useMemo,
  useState,
} from 'react';
import {
  createOrUpdateCar,
  getAllCars,
  getOrRemoveCar,
  startOrStopEngine,
} from '@/api';
import { CarData, Winner } from '@/ts/interfaces';
import { OmitCarData, SetState } from '@/ts/types';
import GaragePage from '@/GaragePage';
import { getDuration, useAnimationFrame } from '@/utils';
import WinnersPage from '@/WinnersPage';
import GarageContext from './Context/GarageContext';
import CarControlContext from './Context/CarControlContext';

interface MainProps {
  isGaragePage: boolean;
}

function Main(
  {
    isGaragePage,
  }: MainProps,
) {
  const [cars, setCars] = useState<CarData[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [animation, setAnimation] = useState<Record<number, number> | null>({});
  const [winner, setWinner] = useState<Winner | void>();

  const getCars = async (resource: string, pages: number) => {
    const res = await getAllCars(resource, pages);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    }
  };

  const getWinner = (item: Winner | void) => setWinner(item);

  const addNewCar = async (
    item: CarData | OmitCarData,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await createOrUpdateCar(resource, method, item);
    await getCars(resource, currentPage);
  };

  const selectCar = async (
    item: CarData | null,
    resource: string,
    method: string,
    id: number,
    setState: SetState<CarData | null> | undefined,
  ) => {
    if (item && setState) {
      const car = await getOrRemoveCar(resource, method, id);
      setState(car);
    }
  };

  const updateSelectedCar = async (
    item: CarData,
    resource: string,
    method: string,
    id: number,
  ) => {
    const car = await createOrUpdateCar(resource, method, item, String(id));
    setCars(cars.map((el) => (el.id === car.id ? car : el)));
  };

  const removeCar = async (
    item: CarData,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await getOrRemoveCar(resource, method, item.id);
    await getCars(resource, currentPage);
  };

  const startEngine = async (
    resource: string,
    car: CarData,
    index: number,
    driving: (progress: number, id: number) => void,
    setState: SetState<number[]>,
    status = 'started',
    method = 'PATCH',
  ) => {
    const { velocity, distance } = await startOrStopEngine(
      resource,
      status,
      car.id,
      method,
    );
    const duration = getDuration(velocity, distance);
    setState((prev) => [...prev, car.id]);
    const success = await useAnimationFrame(
      resource,
      method,
      car.id,
      index,
      duration,
      driving,
      setAnimation,
    );

    const { id, name } = car;

    const result: Winner = {
      name,
      id,
      duration: Number((duration / 1000).toFixed(2)),
    };

    return success ? result : Promise.reject();
  };

  const stopEngine = async (
    resource: string,
    id: number,
    index: number,
    reset: (id: number) => void,
    setState: SetState<number[]>,
    status = 'stopped',
    method = 'PATCH',
  ) => {
    await startOrStopEngine(resource, status, id, method);
    setState((prev) => prev.filter((el) => el !== id));
    reset(index);

    if (animation) {
      cancelAnimationFrame(animation[id]);
    }
  };

  const garageValues = useMemo(() => (
    {
      cars,
      totalCars,
      winner,
    }
  ), [cars, totalCars, winner]);

  const carControl = useMemo(() => ({
    cars,
    addNewCar,
    updateSelectedCar,
    getWinner,
  }), [cars, addNewCar, updateSelectedCar, getWinner]);

  return (
    <main className="main">
      <GarageContext.Provider value={garageValues}>
        <CarControlContext.Provider value={carControl}>
          <GaragePage
            getCars={getCars}
            removeCar={removeCar}
            selectCar={selectCar}
            startEngine={startEngine}
            stopEngine={stopEngine}
            isGaragePage={isGaragePage}
          />
          <WinnersPage
            isGaragePage={isGaragePage}
          />
        </CarControlContext.Provider>
      </GarageContext.Provider>
    </main>
  );
}

export default Main;
