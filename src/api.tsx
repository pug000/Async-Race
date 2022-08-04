import {
  CarData,
  Engine,
  ResponseObject,
  Winner,
} from '@/ts/interfaces';
import { MergeResponseObject, SetState } from './ts/types';

const baseUrl = 'http://localhost:3000';

export const getAllCars = async (
  resource: string,
  page: number,
  limit = 7,
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}?_page=${page}&_limit=${limit}`, {
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

export const getCarOrWinner = async <T,>(
  resource: string,
  method: string,
  id: number,
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}/${id}`, { method });
    const data: T = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const getAllWinners = async (
  resource: string,
  page: number,
  limit = 10
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    });
    const winners: Winner[] = await res.json();
    const data = await Promise.all(winners
      .map(async (winner) => ({ ...winner, car: (await getCarOrWinner<CarData>('garage', 'GET', winner.id)) })));

    const resObj: MergeResponseObject = {
      data,
      count: Number(res.headers.get('X-Total-Count')),
    };
    return resObj;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const removeCarOrWinner = async (
  resource: string,
  method: string,
  id: number,
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}/${id}`, { method });
    const data: CarData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const getWinnerStatus = async (resource: string, method: string, id: number) => {
  try {
    const resStatus = (await fetch(`${baseUrl}/${resource}/${id}`, { method })).status;
    return resStatus;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const createCarOrWinner = async <T,>(
  resource: string,
  method: string,
  item: T,
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}`, {
      method,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export const updateCarOrWinner = async <T,>(
  resource: string,
  method: string,
  item: T,
  id: number,
) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}/${id}`, {
      method,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await res.json();
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
    const res = await fetch(`${baseUrl}/${resource}?id=${id}&status=${status}`, {
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
  const res = await fetch(`${baseUrl}/${resource}?id=${id}&status=${status}`, {
    method,
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export const saveWinner = async <T,>(
  resource: string,
  id: number,
  time: number,
  setState: SetState<T | void>
) => {
  const winnerStatus = await getWinnerStatus(resource, 'GET', id);

  if (winnerStatus === 404) {
    await createCarOrWinner(resource, 'POST', {
      id,
      wins: 1,
      time,
    });
  } else {
    const winner: Winner = await getCarOrWinner(resource, 'GET', id);
    const highScoreTime = time < winner.time ? time : winner.time;
    await updateCarOrWinner(resource, 'PUT', {
      id,
      wins: winner.wins + 1,
      time: highScoreTime,
    }, id);
  }

  setTimeout(() => setState(undefined), 2000);
};
