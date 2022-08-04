import React, { useContext, useState } from 'react';
import { generateRandomCars } from '@/utils';
import BtnId from '@/ts/enum';
import { Button, CarData } from '@/ts/interfaces';
import {
  OmitCarData,
} from '@/ts/types';
import CarSettings from '@/CarSettings';
import CarControlContext from '@/components/Context/CarControlContext';
import styles from './CarControl.module.scss';

interface CarControlProps {
  selectedCar: CarData | null;
  currentPage: number;
  updateState: (item: CarData | null) => void;
  isDisabled: boolean;
  startOnClick: (car: CarData, index: number) => void;
  resetOnClick: (id: number, index: number) => void;
}

function CarControl(
  {
    selectedCar,
    currentPage,
    updateState,
    isDisabled,
    startOnClick,
    resetOnClick,
  }: CarControlProps,
) {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };
  const {
    cars,
    addNewCar,
    updateSelectedCar,
    getNewWinner,
  } = useContext(CarControlContext);

  const [newCar, setNewCar] = useState<CarData>(defaultCar);
  const [isRaceStarted, setRaceState] = useState<boolean>(false);
  const [btns, setBtns] = useState<Button[]>([
    { id: 1, text: 'Race', isDisabled: false },
    { id: 2, text: 'Reset', isDisabled: true },
    { id: 3, text: 'Generate Cars', isDisabled: false },
  ]);

  const updateOnSubmit = (item: CarData) => {
    updateSelectedCar(item, 'garage', 'PUT', item.id);
    updateState(null);
  };

  const addOnSubmit = (item: CarData) => {
    addNewCar(item, 'garage', 'POST', currentPage);
    setNewCar(defaultCar);
  };

  const toggleDisableBtn = () => setBtns((prev) => prev
    .map((el) => ({ ...el, isDisabled: !el.isDisabled })));

  const getRandomCars = () => {
    const newCars: OmitCarData[] = generateRandomCars();
    Promise.all(newCars.map((car) => addNewCar(car, 'garage', 'POST', currentPage)));
  };

  const startRace = () => Promise.any(cars.map((car, i) => startOnClick(car, i)))
    .then((data) => {
      getNewWinner(data);
    });

  const resetRace = () => Promise.all(cars.map((car, i) => resetOnClick(car.id, i)));

  const handleEvent = (currentBtn: Button) => {
    switch (currentBtn.id) {
      case BtnId.first:
        setRaceState(true);
        toggleDisableBtn();
        return startRace();
      case BtnId.second:
        setRaceState(false);
        toggleDisableBtn();
        return resetRace();
      case BtnId.third:
        return getRandomCars();
      default:
        return currentBtn;
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <CarSettings
          text="Create"
          itemCar={newCar}
          isDisabled={false}
          isRaceStarted={isRaceStarted}
          onChangeName={({ target }) => setNewCar({ ...newCar, name: target.value })}
          onChangeColor={({ target }) => setNewCar({ ...newCar, color: target.value })}
          onSubmit={addOnSubmit}
        />
        <CarSettings
          text="Update"
          itemCar={selectedCar || null}
          isDisabled={isDisabled}
          isRaceStarted={isRaceStarted}
          onChangeName={({ target }) => (selectedCar
            ? updateState({ ...selectedCar, name: target.value })
            : null)}
          onChangeColor={({ target }) => (selectedCar
            ? updateState({ ...selectedCar, color: target.value })
            : null)}
          onSubmit={updateOnSubmit}
        />
        <div className={styles.settingsBottom}>
          {btns.map((btn) => (
            <button
              className={styles.settingsBottomBtn}
              disabled={btn.isDisabled}
              key={btn.id}
              type="button"
              onClick={() => handleEvent(btn)}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CarControl;
