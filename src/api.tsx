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
    const response = await fetch(
      `${baseUrl}/${endpoints.garage}?_page=${page}&_limit=${limit}`,
      {
        method: methods.get,
      }
    );
    const responseCar: ResponseCarData = {
      data: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
    return responseCar;
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    }
    throw new Error(`${error}`);
  }
};

const getCarOrWinner = async <T,>(resource: string, id: number) => {
  try {
    const response = await fetch(`${baseUrl}/${resource}/${id}`, {
      method: methods.get,
    });
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getAllWinners = async (
  page: number,
  type: string,
  order: string,
  limit = 10
) => {
  try {
    const response = await fetch(
      `${baseUrl}/${endpoints.winners}?_page=${page}&_limit=${limit}&_sort=${type}&_order=${order}`,
      {
        method: methods.get,
      }
    );
    const winners: Omit<Winner[], 'name' | 'color'> = await response.json();
    const data: Winner[] = await Promise.all(
      winners.map(async (winner) => {
        const { name, color } = await getCarOrWinner<CarData>(
          endpoints.garage,
          winner.id
        );
        return { ...winner, name, color };
      })
    );

    const responseWinner: ResponseWinner = {
      data,
      count: Number(response.headers.get('X-Total-Count')),
    };
    return responseWinner;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const removeCarOrWinner = async (endpoint: string, id: number) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: methods.delete,
    });
    const data: CarData = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getWinnerStatus = async (id: number) => {
  try {
    const responseStatus = (
      await fetch(`${baseUrl}/${endpoints.winners}/${id}`, {
        method: methods.get,
      })
    ).status;
    return responseStatus;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const createCarOrWinner = async <T,>(endpoint: string, item: T) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: methods.post,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const updateCarOrWinner = async <T,>(endpoint: string, item: T, id: number) => {
  try {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`, {
      method: methods.put,
      body: JSON.stringify(item),
      headers: { 'Content-Type': 'application/json' },
    });
    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const startOrStopEngine = async (status: string, id: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/${endpoints.engine}?id=${id}&status=${status}`,
      {
        method: methods.patch,
      }
    );
    const data: Engine = await response.json();
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const getStatusDrive = async (id: number) => {
  const response = await fetch(
    `${baseUrl}/${endpoints.engine}?id=${id}&status=${statusEngine.drive}`,
    {
      method: methods.patch,
    }
  );

  if (response.status !== 200) {
    return { success: false };
  }

  return response.json();
};

const saveWinner = async (id: number, time: number) => {
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
    await updateCarOrWinner(
      endpoints.winners,
      {
        id,
        wins: winner.wins + 1,
        time: highScoreTime,
      },
      id
    );
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
