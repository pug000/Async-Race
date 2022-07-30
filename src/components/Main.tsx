import React, { useState } from 'react';
import {
  createOrUpdateCar,
  getAllCars,
  getOrRemoveCar,
} from '@/api';
import { CarData } from '@/ts/interfaces';
import { OmitCarDataId, SetState } from '@/ts/types';
import GaragePage from '@/GaragePage';

function Main() {
  const [cars, setCars] = useState<CarData[]>([]);

  const [isGarageLoading, setGarageLoading] = useState<boolean>(false);
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

  const addNewCar = async (
    item: CarData | OmitCarDataId,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await createOrUpdateCar(resource, method, item);
    await getCars(resource, currentPage);
  };

  const selectCar = async (
    item: CarData | null,
    resource: string,
    method: string,
    id: number,
    setState: SetState<CarData | null> | undefined,
  ) => {
    if (item && setState) {
      const car = await getOrRemoveCar(resource, method, id);
      setState(car);
    }
  };

  const updateSelectedCar = async (
    item: CarData,
    resource: string,
    method: string,
    id: number,
  ) => {
    const car = await createOrUpdateCar(resource, method, item, String(id));
    setCars(cars.map((el) => (el.id === car.id ? car : el)));
  };

  const removeCar = async (
    item: CarData,
    resource: string,
    method: string,
    currentPage: number,
  ) => {
    await getOrRemoveCar(resource, method, item.id);
    await getCars(resource, currentPage);
  };

  return (
    <main className="main">
      <GaragePage
        cars={cars}
        getCars={getCars}
        addNewCar={addNewCar}
        removeCar={removeCar}
        selectCar={selectCar}
        updateSelectedCar={updateSelectedCar}
        totalCars={totalCars}
        isGarageLoading={isGarageLoading}
      />
    </main>
  );
}

export default Main;
