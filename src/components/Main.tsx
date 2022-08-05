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
  statusEngine,
  endpoints,
} from '@/api';
import { CarData, Winner } from '@/ts/interfaces';
import { NewWinner, OmitCarData, SetState } from '@/ts/types';
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
  const [winners, setWinners] = useState<Winner[]>([]);
  const [totalCars, setTotalCars] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [currentGaragePage, setCurrentGaragePage] = useState(1);
  const [currentWinnersPage, setCurrentWinnersPage] = useState(1);
  const [animation, setAnimation] = useState<Record<number, number> | null>({});
  const [newWinner, setNewWinner] = useState<NewWinner | void>();

  const getCars = async (pages: number) => {
    const res = await getAllCars(pages);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    }
  };

  const getWinners = async (pages: number) => {
    const res = await getAllWinners(pages);
    setWinners(res.data);
    if (res.count) {
      setTotalWinners(res.count);
    }
  };

  const getNewWinner = (item: NewWinner | void) => setNewWinner(item);

  const addNewCar = async (
    item: CarData | OmitCarData,
  ) => {
    await createCarOrWinner(endpoints.garage, item);
    await getCars(currentGaragePage);
  };

  useEffect(() => {
    (async (currentPage: number) => {
      if (newWinner) {
        await saveWinner<NewWinner>(newWinner.id, newWinner.time, setNewWinner);
        await getWinners(currentPage);
      }
    })(currentWinnersPage);
  }, [newWinner]);

  const selectCar = async (
    item: CarData | null,
    setState: SetState<CarData | null> | undefined,
  ) => {
    if (item && setState) {
      const car = await getCarOrWinner<CarData>(endpoints.garage, item.id);
      setState(car);
    }
  };

  const updateSelectedCar = async (
    item: CarData,
  ) => {
    const car = await updateCarOrWinner(endpoints.garage, item, item.id);
    setCars(cars.map((el) => (el.id === car.id ? car : el)));
  };

  const removeCar = async (
    item: CarData,
  ) => {
    await removeCarOrWinner(endpoints.garage, item.id);
    await getCars(currentGaragePage);
  };

  const startEngine = async (
    car: CarData,
    index: number,
    driving: (progress: number, id: number) => void,
    setState: SetState<number[]>,
    status = statusEngine.started,
  ) => {
    const { velocity, distance } = await startOrStopEngine(
      status,
      car.id,
    );
    const duration = getDuration(velocity, distance);
    setState((prev) => [...prev, car.id]);
    const success = await useAnimationFrame(
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
    id: number,
    index: number,
    reset: (id: number) => void,
    setState: SetState<number[]>,
    status = statusEngine.stopped,
  ) => {
    await startOrStopEngine(status, id);
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
      setCurrentGaragePage,
    }
  ), [cars, totalCars, newWinner, setCurrentGaragePage]);

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
            currentPage={currentGaragePage}
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
