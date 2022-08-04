import React, { useEffect, useRef, useState } from 'react';
import { CarData } from '@/ts/interfaces';
import {
  AsyncFn, SetState,
} from '@/ts/types';
import Garage from '@/Garage';
import CarControl from '@/CarControl';

interface GaragePageProps {
  getCars: (resource: string, page: number) => Promise<void>;
  removeCar: AsyncFn<CarData, string, void>;
  selectCar: AsyncFn<CarData | null, string, void>;
  startEngine: (
    resource: string,
    car: CarData,
    index: number,
    driving: (progress: number, id: number) => void,
    setStartedEngine: SetState<number[]>,
  ) => void;
  stopEngine: (
    resource: string,
    id: number,
    index: number,
    reset: (id: number) => void,
    setStartedEngine: SetState<number[]>,
  ) => void;
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
  const [isStartedEngine, setStartedEngine] = useState<number[]>([]);
  const carRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    getCars('garage', currentPage);
  }, [currentPage]);

  useEffect(() => (selectedCar ? setDisabled(false) : setDisabled(true)), [selectedCar]);

  const changePage = (page: number) => setCurrentPage(page);

  const selectOnClick = (item: CarData) => selectCar(item, 'garage', 'GET', item.id, setSelectedCar);

  const driving = (progress: number, index: number) => {
    const currElem = carRef.current[index];

    if (currElem) {
      currElem.style.left = `${progress * 100}%`;
    }
  };

  const reset = (index: number) => {
    const currElem = carRef.current[index];
    if (currElem) {
      currElem.style.left = '0%';
    }
  };

  const startOnClick = async (car: CarData, index: number) => startEngine('engine', car, index, driving, setStartedEngine);

  const resetOnClick = (id: number, index: number) => stopEngine('engine', id, index, reset, setStartedEngine);

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
        startOnClick={startOnClick}
        resetOnClick={resetOnClick}
      />
      <Garage
        isStartedEngine={isStartedEngine}
        currentPage={currentPage}
        changePage={changePage}
        selectOnClick={selectOnClick}
        removeOnClick={removeOnClick}
        startOnClick={startOnClick}
        resetOnClick={resetOnClick}
        carRef={carRef}
      />
    </div>
  );
}

export default GaragePage;
