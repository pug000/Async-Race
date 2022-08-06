import React, { useEffect, useRef, useState } from 'react';
import { CarData } from '@/ts/interfaces';
import {
  AsyncFn,
  NewWinner,
  OmitCarData,
  SetState,
} from '@/ts/types';
import Garage from '@/Garage';
import CarControl from '@/CarControl';
import { generateRandomCars } from '@/utils';
import { endpoints, getCarOrWinner } from '@/api';

interface GaragePageProps {
  cars: CarData[];
  getNewWinner: (car: NewWinner | void) => void;
  addNewCar: AsyncFn<CarData | OmitCarData, void>;
  updateSelectedCar: (item: CarData) => void;
  removeCar: AsyncFn<CarData, void>;
  startEngine: (
    car: CarData,
    index: number,
    driving: (progress: number, id: number) => void,
    setStartedEngine: SetState<number[]>,
  ) => void;
  stopEngine: (
    id: number,
    index: number,
    reset: (id: number) => void,
    setStartedEngine: SetState<number[]>,
  ) => void;
  isGaragePage: boolean;
}

function GaragePage(
  {
    cars,
    getNewWinner,
    addNewCar,
    updateSelectedCar,
    removeCar,
    startEngine,
    stopEngine,
    isGaragePage,
  }: GaragePageProps,
) {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };
  const [isStartedEngine, setStartedEngine] = useState<number[]>([]);
  const [newCar, setNewCar] = useState<CarData>(defaultCar);
  const [randomCars, setRandomCars] = useState<OmitCarData[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [updatedCar, setUpdatedCar] = useState<CarData | null>(null);
  const [removedCar, setRemovedCar] = useState<CarData | null>(null);
  const [isRaceStarted, setRaceStarted] = useState<boolean>(false);
  const carRef = useRef<(HTMLDivElement | null)[]>([]);

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

  const startOnClick = async (car: CarData, index: number) => (
    startEngine(car, index, driving, setStartedEngine));

  const resetOnClick = (id: number, index: number) => (
    stopEngine(id, index, reset, setStartedEngine));

  const selectOnClick = async (car: CarData) => (
    setSelectedCar(await getCarOrWinner<CarData>(endpoints.garage, car.id))
  );

  const removeOnClick = async (car: CarData) => setRemovedCar(car);

  useEffect(() => {
    if (newCar.name) {
      addNewCar(newCar);
      setNewCar(defaultCar);
    }
  }, [newCar]);

  useEffect(() => {
    Promise.all(randomCars.map((car) => addNewCar(car)));
    return () => setRandomCars([]);
  }, [randomCars.length]);

  useEffect(() => {
    if (updatedCar) {
      updateSelectedCar(updatedCar);
      setSelectedCar(null);
      setUpdatedCar(null);
    }
  }, [updatedCar]);

  useEffect(() => {
    if (removedCar) {
      if (selectedCar?.id === removedCar.id) {
        removeCar(removedCar);
        setSelectedCar(null);
        setRemovedCar(null);
      } else {
        removeCar(removedCar);
        setRemovedCar(null);
      }
    }
  }, [removedCar]);

  useEffect(() => {
    if (isRaceStarted) {
      Promise.any(cars.map((car, i) => startOnClick(car, i)))
        .then((data) => getNewWinner(data));
      setSelectedCar(null);
    } else {
      Promise.all(cars.map((car, i) => resetOnClick(car.id, i)));
    }
  }, [isRaceStarted]);

  return (
    <div className="garage" style={{ display: isGaragePage ? 'flex' : 'none' }}>
      <CarControl
        newCar={newCar}
        isRaceStarted={isRaceStarted}
        setNewCar={setNewCar}
        setRaceStarted={setRaceStarted}
        selectedCar={selectedCar}
        getRandomCars={() => setRandomCars(generateRandomCars())}
        setUpdatedCar={setUpdatedCar}
      />
      <Garage
        isStartedEngine={isStartedEngine}
        selectOnClick={selectOnClick}
        startOnClick={startOnClick}
        resetOnClick={resetOnClick}
        removeOnClick={removeOnClick}
        carRef={carRef}
      />
    </div>
  );
}

export default GaragePage;
