import React, { useState } from 'react';
import { generateRandomCars } from '@/utils';
import BtnId from '@/ts/enum';
import { Button, CarData } from '@/ts/interfaces';
import {
  OmitCarData,
  AsyncFn,
} from '@/ts/types';
import CarSettings from '@/CarSettings';

import styles from './CarControl.module.scss';

interface CarControlProps {
  addNewCar: AsyncFn<CarData | OmitCarData, string, void>;
  updateSelectedCar: AsyncFn<CarData, string, void>;
  selectedCar: CarData | null;
  currentPage: number;
  updateState: (item: CarData | null) => void;
  isDisabled: boolean;
}

function CarControl(
  {
    addNewCar,
    updateSelectedCar,
    selectedCar,
    currentPage,
    updateState,
    isDisabled,
  }: CarControlProps,
) {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };

  const [newCar, setNewCar] = useState<CarData>(defaultCar);
  const btns: Button[] = [
    { id: 1, text: 'Race' },
    { id: 2, text: 'Reset' },
    { id: 3, text: 'Generate Cars' },
  ];

  const updateOnSubmit = (item: CarData) => {
    updateSelectedCar(item, 'garage', 'PUT', item.id);
    updateState(null);
  };

  const addOnSubmit = (item: CarData) => {
    addNewCar(item, 'garage', 'POST', currentPage);
    setNewCar(defaultCar);
  };

  const getRandomCars = async () => {
    const cars: OmitCarData[] = generateRandomCars();
    Promise.all(cars.map((car) => addNewCar(car, 'garage', 'POST', currentPage)));
  };

  const handleEvent = (currentBtn: Button) => {
    switch (currentBtn.id) {
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
          onChangeName={({ target }) => setNewCar({ ...newCar, name: target.value })}
          onChangeColor={({ target }) => setNewCar({ ...newCar, color: target.value })}
          onSubmit={addOnSubmit}
        />
        <CarSettings
          text="Update"
          itemCar={selectedCar || null}
          isDisabled={isDisabled}
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
