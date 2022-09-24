import React, {
  useEffect,
  useState
} from 'react';

import { generateRandomCars } from 'utils';
import {
  endpoints,
  getCarOrWinner
} from 'api';

import { CarData } from 'ts/interfaces';
import {
  AsyncFn,
  OmitCarData,
} from 'ts/types';

import Garage from './Garage/Garage';
import CarControl from './CarControl/CarControl';
import StyledGaragePage from './GaragePage.style';

interface GaragePageProps {
  addNewCar: AsyncFn<CarData | OmitCarData, void>;
  updateSelectedCar: (item: CarData) => void;
  removeCar: AsyncFn<CarData, void>;
  isGaragePage: boolean;
}

function GaragePage(
  {
    addNewCar,
    updateSelectedCar,
    removeCar,
    isGaragePage,
  }: GaragePageProps,
) {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };
  const [newCar, setNewCar] = useState<CarData>(defaultCar);
  const [randomCars, setRandomCars] = useState<OmitCarData[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [updatedCar, setUpdatedCar] = useState<CarData | null>(null);
  const [removedCar, setRemovedCar] = useState<CarData | null>(null);
  const [isRaceStarted, setRaceStarted] = useState<boolean>(false);

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

  return (
    <StyledGaragePage active={isGaragePage}>
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
        isRaceStarted={isRaceStarted}
        selectOnClick={selectOnClick}
        removeOnClick={removeOnClick}
        setSelectedCar={setSelectedCar}
      />
    </StyledGaragePage>
  );
}

export default GaragePage;
