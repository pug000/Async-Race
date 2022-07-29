import { CarData } from './ts/interfaces';

export const getCars = async (
  url: string,
  resource: string,
  method: string,
) => {
  try {
    const res = await fetch(`${url}/${resource}`, { method });
    const data: CarData[] = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const getOrRemoveCar = async (
  url: string,
  resource: string,
  method: string,
  id: number,
) => {
  try {
    const res = await fetch(`${url}/${resource}/${id}`, { method });
    const data: CarData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const createOrUpdateCar = async (
  url: string,
  resource: string,
  method: string,
  item: CarData | Omit<CarData, 'id'>,
  id = '',
) => {
  try {
    const res = await fetch(`${url}/${resource}/${id}`, {
      method,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: CarData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};
