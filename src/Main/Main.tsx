import React, { useEffect, useState } from 'react';
import getCars from '../api';
import { CarData, Methods, Resource } from '../ts/interfaces';
import CarSettings from './CarSettings/CarSettings';
import Garage from './Garage/Garage';

function Main() {
  const [cars, setCars] = useState<CarData[]>([]);
  const [isCarLoading, setCarLoading] = useState<boolean>(false);
  const [baseUrl] = useState<string>('http://127.0.0.1:3000');
  const [method] = useState<Methods>({
    get: 'GET',
    post: 'POST',
    delete: 'DELETE',
  });
  const [resource] = useState<Resource>({
    garage: 'garage',
    winners: 'winners',
  });

  useEffect(() => {
    setCarLoading(true);
    getCars(baseUrl, resource.garage, method.get)
      .then((data) => setCars(data));
    setCarLoading(false);
  }, [baseUrl]);

  return (
    <main className="main">
      <CarSettings />
      <Garage
        cars={cars}
        isCarLoading={isCarLoading}
      />
    </main>
  );
}

export default Main;
