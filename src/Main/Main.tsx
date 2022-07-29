import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';

import {
  createOrUpdateCar,
  getAllCars,
  getOrRemoveCar,
} from '../api';
import { CarData } from '../ts/interfaces';
import Garage from './Garage/Garage';
import CarSetting from './CarSetting/CarSetting';
import CarSettingBtns from './CarSetting/CarSettingBtns';
import { OmitCarDataId } from '../ts/types';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCars, setTotalCars] = useState(0);

  const getCars = async (resource: string, pages: number) => {
    setGarageLoading(true);
    const res = await getAllCars(resource, pages);
    setCars(res.data);
    if (res.count) {
      setTotalCars(res.count);
    }
    setGarageLoading(false);
  };

  const addNewCar = async (item: CarData | OmitCarDataId) => {
    await createOrUpdateCar('garage', 'POST', item);
    await getCars('garage', currentPage);
  };

  const removeCar = async (item: CarData) => {
    await getOrRemoveCar('garage', 'DELETE', item.id);
    await getCars('garage', currentPage);
  };

  const selectCar = (item: CarData) => getOrRemoveCar('garage', 'GET', item.id)
    .then((car) => setSelectedCar(car));

  const updateSelectedCar = (item: CarData) => createOrUpdateCar('garage', 'PUT', item, String(item.id))
    .then((car) => setCars(cars.map((el) => (el.id === car.id ? car : el))));

  useEffect(() => {
    getCars('garage', currentPage);
  }, [currentPage]);

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
          <CarSettingBtns generateOnClick={(item: OmitCarDataId) => addNewCar(item)} />
        </div>
      </div>
      <Garage
        cars={cars}
        currentPage={currentPage}
        totalCars={totalCars}
        isGarageLoading={isGarageLoading}
        changePage={(page: number) => setCurrentPage(page)}
        selectOnClick={(item: CarData) => selectCar(item)}
        removeOnClick={(item: CarData) => (selectedCar && selectedCar.id === item.id
          ? setSelectedCar(null)
          : removeCar(item))}
      />
    </main>
  );
}

export default Main;
