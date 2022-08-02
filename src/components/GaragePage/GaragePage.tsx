import React, { useEffect, useState } from 'react';
import { CarData } from '@/ts/interfaces';
import {
  OmitCarData,
  AsyncFn,
} from '@/ts/types';
import Pagination from '@/Pagination';
import CarControl from '@/CarControl';

interface GaragePageProps {
  cars: CarData[];
  getCars: (resource: string, page: number) => Promise<void>;
  addNewCar: AsyncFn<CarData | OmitCarData, string, void>;
  removeCar: AsyncFn<CarData, string, void>;
  selectCar: AsyncFn<CarData | null, string, void>;
  updateSelectedCar: AsyncFn<CarData, string, void>;
  startEngine: (
    resource: string,
    id: number,
    driving: (progress: number, id: number) => void,
  ) => void;
  stopEngine: (resource: string, id: number, reset: (id: number) => void) => void;
  totalCars: number;
  isGarageLoading: boolean;
}

function GaragePage(
  {
    cars,
    getCars,
    addNewCar,
    removeCar,
    selectCar,
    updateSelectedCar,
    startEngine,
    stopEngine,
    totalCars,
    isGarageLoading,
  }: GaragePageProps,
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);

  useEffect(() => {
    getCars('garage', currentPage);
  }, [currentPage]);

  useEffect(() => (selectedCar ? setDisabled(false) : setDisabled(true)), [selectedCar]);

  const changePage = (page: number) => setCurrentPage(page);

  const selectOnClick = (item: CarData) => selectCar(item, 'garage', 'GET', item.id, setSelectedCar);

  const startOnClick = (id: number, driving: (progress: number, id: number) => void) => {
    startEngine('engine', id, driving);
  };

  const resetOnClick = async (id: number, reset: (id: number) => void) => {
    await stopEngine('engine', id, reset);
  };

  const removeOnClick = (item: CarData) => (selectedCar && selectedCar.id === item.id
    ? setSelectedCar(null)
    : removeCar(item, 'garage', 'DELETE', currentPage));

  return (
    <div className="garage">
      <CarControl
        addNewCar={addNewCar}
        updateSelectedCar={updateSelectedCar}
        selectedCar={selectedCar || null}
        updateState={(item: CarData | null) => setSelectedCar(item)}
        currentPage={currentPage}
        isDisabled={isDisabled}
      />
      <Pagination
        cars={cars}
        currentPage={currentPage}
        totalCars={totalCars}
        isGarageLoading={isGarageLoading}
        changePage={changePage}
        selectOnClick={selectOnClick}
        removeOnClick={removeOnClick}
        startOnClick={startOnClick}
        resetOnClick={resetOnClick}
      />
    </div>
  );
}

export default GaragePage;
