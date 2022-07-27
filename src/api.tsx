import { OmitCarData } from './ts/types';

export const getCars = async (
  url: string,
  resource: string,
  method: string,
) => {
  try {
    const res = await fetch(`${url}/${resource}`, { method });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const removeCar = async (
  url: string,
  resource: string,
  method: string,
  id: number,
) => {
  try {
    const res = await fetch(`${url}/${resource}/${id}`, { method });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const createCar = async (
  url: string,
  resource: string,
  method: string,
  item: OmitCarData<'id'>,
) => {
  try {
    const res = await fetch(`${url}/${resource}`, {
      method,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const newItem = await res.json();
    return newItem;
  } catch (err) {
    throw new Error(`${err}`);
  }
};
