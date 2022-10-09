import { Endpoints, Methods, StatusEngine } from 'ts/enum';
import { Engine } from 'ts/interfaces';

const baseUrl = 'http://localhost:3000';

const fetchOptions = (
  method: string,
  url: string,
  params: Record<string, number | string> = {}
) => ({
  url,
  method,
  params,
  headers: { 'Content-Type': 'application/json' },
});

const startOrStopEngine = async (status: string, id: number) => {
  try {
    const response = await fetch(
      `${baseUrl}/${Endpoints.engine}?id=${id}&status=${status}`,
      {
        method: Methods.patch,
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
    `${baseUrl}/${Endpoints.engine}?id=${id}&status=${StatusEngine.drive}`,
    {
      method: Methods.patch,
    }
  );

  if (response.status !== 200) {
    return { success: false };
  }

  return response.json();
};

export { baseUrl, startOrStopEngine, getStatusDrive, fetchOptions };
