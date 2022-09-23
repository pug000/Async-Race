import {
  Api,
  CarData,
  Engine,
  ResponseCarData,
  ResponseWinner,
  Winner,
} from 'ts/interfaces';
import { SetState } from 'ts/types';

const baseUrl = 'http://localhost:3000';
const endpoints: Api = {
  garage: 'garage',
  winners: 'winners',
  engine: 'engine',
};

const methods: Api = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  patch: 'PATCH',
  delete: 'DELETE',
};

const statusEngine: Api = {
  started: 'started',
  drive: 'drive',
  stopped: 'stopped',
};

const getAllCars = async (
  page: number,
  setError: SetState<string | null>,
  limit = 7
) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.garage}?_page=${page}&_limit=${limit}`, {
      method: methods.get,
    });
    const resObj: ResponseCarData = {
      data: await res.json(),
      count: Number(res.headers.get('X-Total-Count')),
    };
    return resObj;
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
    throw new Error(`${err}`);
  }
};

const getCarOrWinner = async <T,>(resource: string, id: number) => {
  try {
    const res = await fetch(`${baseUrl}/${resource}/${id}`, { method: methods.get });
    const data: T = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getAllWinners = async (
  page: number,
  type: string,
  order: string,
  limit = 10,
) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.winners}?_page=${page}&_limit=${limit}&_sort=${type}&_order=${order}`, {
      method: methods.get,
    });
    const winners: Omit<Winner[], 'name' | 'color'> = await res.json();
    const data: Winner[] = await Promise.all(winners
      .map(async (winner) => {
        const {
          name,
          color,
        } = (await getCarOrWinner<CarData>(endpoints.garage, winner.id));
        return { ...winner, name, color };
      }));

    const resObj: ResponseWinner = {
      data,
      count: Number(res.headers.get('X-Total-Count')),
    };
    return resObj;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const removeCarOrWinner = async (endpoint: string, id: number) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}/${id}`, { method: methods.delete });
    const data: CarData = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getWinnerStatus = async (id: number) => {
  try {
    const resStatus = (await fetch(`${baseUrl}/${endpoints.winners}/${id}`, { method: methods.get })).status;
    return resStatus;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const createCarOrWinner = async <T,>(endpoint: string, item: T) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}`, {
      method: methods.post,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const updateCarOrWinner = async <T,>(endpoint: string, item: T, id: number) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: methods.put,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const startOrStopEngine = async (status: string, id: number) => {
  try {
    const res = await fetch(`${baseUrl}/${endpoints.engine}?id=${id}&status=${status}`, {
      method: methods.patch,
    });
    const data: Engine = await res.json();
    return data;
  } catch (err) {
    throw new Error(`${err}`);
  }
};

const getStatusDrive = async (id: number) => {
  const res = await fetch(`${baseUrl}/${endpoints.engine}?id=${id}&status=${statusEngine.drive}`, {
    method: methods.patch,
  }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const saveWinner = async (
  id: number,
  time: number,
) => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createCarOrWinner(endpoints.winners, {
      id,
      wins: 1,
      time,
    });
  } else {
    const winner: Winner = await getCarOrWinner(endpoints.winners, id);
    const highScoreTime = time < winner.time ? time : winner.time;
    await updateCarOrWinner(endpoints.winners, {
      id,
      wins: winner.wins + 1,
      time: highScoreTime,
    }, id);
  }
};

export {
  endpoints,
  methods,
  statusEngine,
  getAllCars,
  getAllWinners,
  getCarOrWinner,
  createCarOrWinner,
  removeCarOrWinner,
  startOrStopEngine,
  getStatusDrive,
  updateCarOrWinner,
  saveWinner,
};
