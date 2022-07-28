import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';

import {
  createCar,
  getCars,
  removeCar,
} from '../api';
import { CarData } from '../ts/interfaces';
import CarSetting from './CarSetting/CarSettings';
import Garage from './Garage/Garage';

function Main() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [newCar, setNewCar] = useState<CarData>();
  const [removedCar, setRemovedCar] = useState<CarData>();
  const [isGarageLoading, setGarageLoading] = useState<boolean>(false);
  const [baseUrl] = useState<string>('http://127.0.0.1:3000');

  const addCarToGarage = (item: CarData) => setCars([...cars, item]);

  const removeCarFromGarage = (id: number) => setCars(cars.filter((item) => item.id !== id));

  useEffect(() => {
    setGarageLoading(true);
    getCars(baseUrl, 'garage', 'GET')
      .then((data) => setCars(data));
    setGarageLoading(false);
  }, [baseUrl]);

  useEffect(() => {
    if (newCar) {
      createCar(baseUrl, 'garage', 'POST', newCar)
        .then((car) => addCarToGarage(car));
    }
  }, [newCar]);

  useEffect(() => {
    if (removedCar) {
      removeCar(baseUrl, 'garage', 'DELETE', removedCar.id)
        .then(() => removeCarFromGarage(removedCar.id));
    }
  }, [removedCar]);

  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        <div className={styles.settingsTop}>
          <CarSetting
            text="Create"
            itemCar={newCar}
            isDisabled={false}
            onSubmit={(item: CarData) => setNewCar(item)}
          />
          <div className={styles.settingsBottom}>
            <button className={styles.settingsBtn} type="button">Race</button>
            <button className={styles.settingsBtn} type="button">Reset</button>
            <button className={styles.settingsBtn} type="button">Generate Car</button>
          </div>
        </div>
      </div>
      <Garage
        cars={cars}
        isGarageLoading={isGarageLoading}
        removeOnClick={(item: CarData) => setRemovedCar(item)}
      />
    </main>
  );
}

export default Main;
