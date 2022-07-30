import { CarData, ResponseObject } from '@/ts/interfaces';
import { OmitCarDataId } from '@/ts/types';

export const getAllCars = async (
  resource: string,
  page: number,
  limit = 7,
) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/${resource}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    });
    const resObj: ResponseObject = {
      data: await res.json(),
      count: Number(res.headers.get('X-Total-Count')),
    };
    return resObj;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const getOrRemoveCar = async (
  resource: string,
  method: string,
  id: number,
) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/${resource}/${id}`, { method });
    const data: CarData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const createOrUpdateCar = async (
  resource: string,
  method: string,
  item: CarData | OmitCarDataId,
  id = '',
) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/${resource}/${id}`, {
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
