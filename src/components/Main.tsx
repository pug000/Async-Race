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
import { CarData } from '@/ts/interfaces';
import { OmitCarData, SetState } from '@/ts/types';
import GaragePage from '@/components/GaragePage/GaragePage';
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
  const [isGarageLoading, setGarageLoading] = useState<boolean>(false);
  const [totalCars, setTotalCars] = useState(0);
  const [animation, setAnimation] = useState<Record<number, number> | null>({});

  const getCars = async (resource: string, pages: number) => {
    setGarageLoading(true);
    const res = await getAllCars(resource, pages);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    }
    setGarageLoading(false);
  };

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
    id: number,
    driving: (progress: number, id: number) => void,
    status = 'started',
    method = 'PATCH',
  ) => {
    const { velocity, distance } = await startOrStopEngine(
      resource,
      status,
      id,
      method,
    );
    const duration = getDuration(velocity, distance);
    useAnimationFrame(resource, method, id, duration, driving, setAnimation);
  };

  const stopEngine = async (
    resource: string,
    id: number,
    reset: (id: number) => void,
    status = 'stopped',
    method = 'PATCH',
  ) => {
    await startOrStopEngine(resource, status, id, method);
    reset(id);
    if (animation) {
      cancelAnimationFrame(animation[id]);
    }
  };

  const value = useMemo(() => (
    {
      cars,
      isGarageLoading,
      totalCars,
    }
  ), [cars, isGarageLoading, totalCars]);

  const asyncFn = useMemo(() => ({
    addNewCar,
    updateSelectedCar,
  }), [addNewCar, updateSelectedCar]);

  return (
    <main className="main">
      <GarageContext.Provider value={value}>
        <CarControlContext.Provider value={asyncFn}>
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
