import React, { useCallback, useEffect } from 'react';

import {
  useCreateCarMutation,
  useEditCarMutation,
} from 'redux/services/garageService';
import {
  useEditWinnerMutation,
  useLazyGetWinnerQuery,
} from 'redux/services/winnersService';
import {
  setDisabledSettings,
  setRaceStarted,
  setSelectedCar,
} from 'redux/slices/garageSlice';

import Button from 'components/Button/Button';

import { defaultCar, generateRandomCars } from 'utils';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { CarData } from 'ts/interfaces';

import {
  CarControlTop,
  CarControlWrapper,
  StyledCarControl,
} from './CarControl.style';
import CarSettings from './CarSettings/CarSettings';

function CarControl() {
  const { selectedCar, isRaceStarted, isDisabledSettings } = useAppSelector(
    (state) => state.garage
  );
  const dispatch = useAppDispatch();
  const [createCar] = useCreateCarMutation();
  const [updateCar] = useEditCarMutation();
  const [triggerGetWinner] = useLazyGetWinnerQuery();
  const [editWinner] = useEditWinnerMutation();

  const createNewCar = useCallback(
    async (car: CarData) => {
      await createCar(car);
    },
    [createCar]
  );

  const updateSelectedCar = useCallback(
    async (car: CarData) => {
      await updateCar(car);
      const { data: winner } = await triggerGetWinner(car.id);
      if (winner) {
        await editWinner({ ...winner, name: car.name, color: car.color });
      }
      dispatch(setSelectedCar(null));
    },
    [updateCar]
  );

  const createRandomCars = useCallback(() => {
    const randomCars = generateRandomCars();
    Promise.all(randomCars.map((car) => createCar(car)));
  }, [createCar]);

  const toggleRace = useCallback(
    (value: boolean) => {
      dispatch(setRaceStarted(value));
    },
    [isRaceStarted]
  );

  const toggleDisabledSettings = useCallback(
    (value: boolean) => {
      dispatch(setDisabledSettings(value));
    },
    [isDisabledSettings]
  );

  useEffect(() => {
    if (selectedCar) {
      toggleDisabledSettings(false);
    } else {
      toggleDisabledSettings(true);
    }
  }, [selectedCar]);

  return (
    <StyledCarControl>
      <CarControlTop>
        <CarSettings
          text="Create"
          itemCar={defaultCar}
          isDisabledSettings={false}
          callback={createNewCar}
          isRaceStarted={isRaceStarted}
        />
        <CarSettings
          text="Update"
          itemCar={selectedCar}
          isDisabledSettings={isDisabledSettings}
          callback={updateSelectedCar}
          isRaceStarted={isRaceStarted}
        />
        <CarControlWrapper>
          <Button
            text="Race"
            disabled={isRaceStarted}
            callback={() => toggleRace(true)}
          />
          <Button
            text="Reset"
            disabled={!isRaceStarted}
            callback={() => toggleRace(false)}
          />
          <Button
            text="Generate Cars"
            disabled={isRaceStarted}
            callback={() => createRandomCars()}
          />
        </CarControlWrapper>
      </CarControlTop>
    </StyledCarControl>
  );
}

export default CarControl;
