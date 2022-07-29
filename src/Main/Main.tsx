import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';

import {
  createOrUpdateCar,
  getCars,
  getOrRemoveCar,
} from '../api';
import { CarData } from '../ts/interfaces';
import Garage from './Garage/Garage';
import CarSetting from './CarSetting/CarSetting';

function Main() {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };

  const [newCar, setNewCar] = useState<CarData>(defaultCar);
  const [cars, setCars] = useState<CarData[]>([]);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [isGarageLoading, setGarageLoading] = useState<boolean>(false);
  const [baseUrl] = useState<string>('http://127.0.0.1:3000');

  const addNewCar = (item: CarData) => createOrUpdateCar(baseUrl, 'garage', 'POST', item)
    .then((car) => setCars([...cars, car]));

  const removeCar = (item: CarData) => getOrRemoveCar(baseUrl, 'garage', 'DELETE', item.id)
    .then(() => setCars(cars.filter((el) => el.id !== item.id)));

  const selectCar = (item: CarData) => getOrRemoveCar(baseUrl, 'garage', 'GET', item.id)
    .then((car) => setSelectedCar(car));

  const updateSelectedCar = (item: CarData) => createOrUpdateCar(baseUrl, 'garage', 'PUT', item, String(item.id))
    .then((car) => setCars(cars.map((el) => (el.id === car.id ? car : el))));

  useEffect(() => {
    setGarageLoading(true);
    getCars(baseUrl, 'garage', 'GET')
      .then((data) => setCars(data));
    setGarageLoading(false);
  }, [baseUrl]);

  useEffect(() => (selectedCar ? setDisabled(false) : setDisabled(true)), [selectedCar]);

  return (
    <main className={styles.main}>
      <div className={styles.settings}>
        <div className={styles.settingsTop}>
          <CarSetting
            text="Create"
            itemCar={newCar}
            isDisabled={false}
            onChangeName={({ target }) => setNewCar({ ...newCar, name: target.value })}
            onChangeColor={({ target }) => setNewCar({ ...newCar, color: target.value })}
            onSubmit={(item: CarData) => {
              addNewCar(item);
              setNewCar(defaultCar);
            }}
          />
          <CarSetting
            text="Update"
            itemCar={selectedCar || null}
            isDisabled={isDisabled}
            onChangeName={({ target }) => (selectedCar
              ? setSelectedCar({ ...selectedCar, name: target.value })
              : null)}
            onChangeColor={({ target }) => (selectedCar
              ? setSelectedCar({ ...selectedCar, color: target.value })
              : null)}
            onSubmit={(item: CarData) => {
              updateSelectedCar(item);
              setSelectedCar(null);
            }}
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
        selectOnClick={(item: CarData) => selectCar(item)}
        removeOnClick={(item: CarData) => (selectedCar && selectedCar.id === item.id
          ? setSelectedCar(null)
          : removeCar(item))}
      />
    </main>
  );
}

export default Main;
