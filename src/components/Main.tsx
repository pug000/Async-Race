import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createCarOrWinner,
  getAllCars,
  removeCarOrWinner,
  startOrStopEngine,
  updateCarOrWinner,
  getCarOrWinner,
  saveWinner,
  getAllWinners,
} from '@/api';
import { CarData, NewWinner } from '@/ts/interfaces';
import { OmitCarData, SetState, WinnerWithCar } from '@/ts/types';
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
  const [winners, setWinners] = useState<WinnerWithCar[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [currentWinnersPage, setCurrentWinnersPage] = useState(1);
  const [animation, setAnimation] = useState<Record<number, number> | null>({});
  const [newWinner, setNewWinner] = useState<NewWinner | void>();

  const getCars = async (resource: string, pages: number) => {
    const res = await getAllCars(resource, pages);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    }
  };

  const getWinners = async (resource: string, pages: number) => {
    const res = await getAllWinners(resource, pages);
    setWinners(res.data);
    if (res.count) {
      setTotalWinners(res.count);
    }
  };

  const getNewWinner = (item: NewWinner | void) => setNewWinner(item);

  const addNewCar = async (
    item: CarData | OmitCarData,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await createCarOrWinner(resource, method, item);
    await getCars(resource, currentPage);
  };

  useEffect(() => {
    (async (resource: string, currentPage: number) => {
      if (newWinner) {
        await saveWinner<NewWinner>(resource, newWinner.id, newWinner.time, setNewWinner);
        await getWinners(resource, currentPage);
      }
    })('winners', currentWinnersPage);
  }, [newWinner]);

  const selectCar = async (
    item: CarData | null,
    resource: string,
    method: string,
    id: number,
    setState: SetState<CarData | null> | undefined,
  ) => {
    if (item && setState) {
      const car = await getCarOrWinner<CarData>(resource, method, id);
      setState(car);
    }
  };

  const updateSelectedCar = async (
    item: CarData,
    resource: string,
    method: string,
    id: number,
  ) => {
    const car = await updateCarOrWinner(resource, method, item, id);
    setCars(cars.map((el) => (el.id === car.id ? car : el)));
  };

  const removeCar = async (
    item: CarData,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await removeCarOrWinner(resource, method, item.id);
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

    const result: Omit<NewWinner, 'wins'> = {
      name: car.name,
      id: car.id,
      time: Number((duration / 1000).toFixed(2)),
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
      newWinner,
    }
  ), [cars, totalCars, newWinner]);

  const carControl = useMemo(() => ({
    cars,
    addNewCar,
    updateSelectedCar,
    getNewWinner,
  }), [cars, addNewCar, updateSelectedCar, getNewWinner]);

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
            getWinners={getWinners}
            winners={winners}
            totalWinners={totalWinners}
            currentPage={currentWinnersPage}
            setCurrentPage={setCurrentWinnersPage}
          />
        </CarControlContext.Provider>
      </GarageContext.Provider>
    </main>
  );
}

export default Main;
