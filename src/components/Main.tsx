import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createCarOrWinner,
  getAllCars,
  removeCarOrWinner,
  updateCarOrWinner,
  saveWinner,
  getAllWinners,
  endpoints,
} from '@/api';
import { CarData, SortBy, Winner } from '@/ts/interfaces';
import { NewWinner, OmitCarData } from '@/ts/types';
import GaragePage from '@/GaragePage';
import WinnersPage from '@/WinnersPage';
import GarageContext from './Context/GarageContext';

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newWinner, setNewWinner] = useState<NewWinner | void>();
  const [sortWinners, setSortWinners] = useState<SortBy>({
    type: 'id',
    order: 'ASC',
  });

  const toggleSort = (text: string) => setSortWinners((prev) => (
    {
      type: text,
      order: prev.order === 'ASC' ? 'DESC' : 'ASC'
    }
  ));

  const getCars = async (pages: number) => {
    const res = await getAllCars(pages, setErrorMessage);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    } else {
      setTotalCars(0);
    }
  };

  const getWinners = async (pages: number, type: string, order: string) => {
    const res = await getAllWinners(pages, type, order);
    setWinners(res.data);
    if (res.count) {
      setTotalWinners(res.count);
    } else {
      setTotalWinners(0);
    }
  };

  const addNewCar = async (item: CarData | OmitCarData) => {
    await createCarOrWinner(endpoints.garage, item);
    await getCars(currentGaragePage);
  };

  useEffect(() => {
    (async () => {
      if (newWinner) {
        await saveWinner(newWinner.id, newWinner.time);
        setTimeout(() => setNewWinner(undefined), 2000);
        await getWinners(currentWinnersPage, sortWinners.type, sortWinners.order);
      }
    })();
  }, [newWinner]);

  useEffect(() => { getCars(currentGaragePage); }, [currentGaragePage]);

  useEffect(() => {
    getWinners(currentWinnersPage, sortWinners.type, sortWinners.order);
  }, [currentWinnersPage, sortWinners]);

  const updateSelectedCar = async (item: CarData) => {
    const car = await updateCarOrWinner(endpoints.garage, item, item.id);
    setCars(cars.map((el) => (el.id === car.id ? car : el)));
    setWinners(winners.map((el) => (el.id !== car.id ? el : {
      ...el,
      name: car.name,
      color: car.color,
    })));
  };

  const removeCar = async (item: CarData) => {
    await Promise.all(Object.values(endpoints)
      .slice(0, -1)
      .map((key) => (
        removeCarOrWinner(key, item.id)
      )));
    await getCars(currentGaragePage);
    await getWinners(currentWinnersPage, sortWinners.type, sortWinners.order);
  };

  const getNewWinner = (item: NewWinner | void) => setNewWinner(item);

  const garageValues = useMemo(() => (
    {
      cars,
      totalCars,
      newWinner,
      errorMessage,
      setCurrentGaragePage,
      removeCar,
      getNewWinner,
      currentGaragePage,
    }
  ), [
    cars,
    errorMessage,
    totalCars,
    newWinner,
    currentGaragePage,
  ]);

  return (
    <main className="main">
      <GarageContext.Provider value={garageValues}>
        <GaragePage
          updateSelectedCar={updateSelectedCar}
          addNewCar={addNewCar}
          removeCar={removeCar}
          isGaragePage={isGaragePage}
        />
        <WinnersPage
          isGaragePage={isGaragePage}
          winners={winners}
          totalWinners={totalWinners}
          currentPage={currentWinnersPage}
          setCurrentPage={setCurrentWinnersPage}
          sortWinners={sortWinners}
          toggleSort={toggleSort}
        />
      </GarageContext.Provider>
    </main>
  );
}

export default Main;
