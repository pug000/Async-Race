import React, { useEffect, useState } from 'react';
import { createCar, getCars, removeCar } from '../api';
import { CarData } from '../ts/interfaces';
import { OmitCarData } from '../ts/types';
import CarSettings from './CarSettings/CarSettings';
import Garage from './Garage/Garage';

function Main() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [isCarLoading, setCarLoading] = useState<boolean>(false);
  const [baseUrl] = useState<string>('http://127.0.0.1:3000');

  useEffect(() => {
    setCarLoading(true);
    getCars(baseUrl, 'garage', 'GET')
      .then((data) => setCars(data));
    setCarLoading(false);
  }, [baseUrl]);

  const addCarToGarage = (item: CarData) => setCars([...cars, item]);

  const removeCarFromGarage = (id: number) => setCars(cars.filter((item) => item.id !== id));

  return (
    <main className="main">
      <CarSettings
        addOnClick={(item: OmitCarData<'id'>) => createCar(baseUrl, 'garage', 'POST', item)
          .then((car: CarData) => addCarToGarage(car))}
      />
      <Garage
        cars={cars}
        isCarLoading={isCarLoading}
        removeOnClick={(id: number) => removeCar(baseUrl, 'garage', 'DELETE', id)
          .then(() => removeCarFromGarage(id))}
      />
    </main>
  );
}

export default Main;
