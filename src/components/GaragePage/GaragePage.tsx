import React, { useEffect, useState } from 'react';
import { CarData } from '@/ts/interfaces';
import {
  AsyncFn,
} from '@/ts/types';
import Garage from '@/Garage';
import CarControl from '@/CarControl';

interface GaragePageProps {
  getCars: (resource: string, page: number) => Promise<void>;
  removeCar: AsyncFn<CarData, string, void>;
  selectCar: AsyncFn<CarData | null, string, void>;
  startEngine: (
    resource: string,
    id: number,
    driving: (progress: number, id: number) => void,
  ) => void;
  stopEngine: (resource: string, id: number, reset: (id: number) => void) => void;
  isGaragePage: boolean;
}

function GaragePage(
  {
    getCars,
    removeCar,
    selectCar,
    startEngine,
    stopEngine,
    isGaragePage,
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

  const resetOnClick = (id: number, reset: (id: number) => void) => {
    stopEngine('engine', id, reset);
  };

  const removeOnClick = (item: CarData) => (selectedCar && selectedCar.id === item.id
    ? setSelectedCar(null)
    : removeCar(item, 'garage', 'DELETE', currentPage));

  return (
    <div className="garage" style={{ display: isGaragePage ? 'flex' : 'none' }}>
      <CarControl
        selectedCar={selectedCar || null}
        updateState={(item: CarData | null) => setSelectedCar(item)}
        currentPage={currentPage}
        isDisabled={isDisabled}
      />
      <Garage
        currentPage={currentPage}
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
