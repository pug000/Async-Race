import { CarData, Engine, ResponseObject } from '@/ts/interfaces';
import { OmitCarData } from '@/ts/types';

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
  item: CarData | OmitCarData,
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

export const startOrStopEngine = async (
  resource: string,
  status: string,
  id: number,
  method: string,
) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/${resource}?id=${id}&status=${status}`, {
      method,
    });
    const data: Engine = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const getStatusDrive = async (
  resource: string,
  id: number,
  status: string,
  method: string,
) => {
  const res = await fetch(`http://127.0.0.1:3000/${resource}?id=${id}&status=${status}`, {
    method,
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};
