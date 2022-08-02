import React, {
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
import GaragePage from '@/GaragePage';
import { getDuration, useAnimationFrame } from '@/utils';
import WinnersPage from '@/WinnersPage';

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

  return (
    <main className="main">
      <GaragePage
        cars={cars}
        getCars={getCars}
        addNewCar={addNewCar}
        removeCar={removeCar}
        selectCar={selectCar}
        updateSelectedCar={updateSelectedCar}
        startEngine={startEngine}
        stopEngine={stopEngine}
        totalCars={totalCars}
        isGarageLoading={isGarageLoading}
        isGaragePage={isGaragePage}
      />
      <WinnersPage
        isGaragePage={isGaragePage}
      />
    </main>
  );
}

export default Main;
