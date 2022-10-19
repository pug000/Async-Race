import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseUrl, fetchOptions } from 'api';

import { Endpoints, Methods, StatusEngine } from 'ts/enum';
import { Engine } from 'ts/interfaces';

const engineApi = createApi({
  reducerPath: 'engineApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Engine'],
  endpoints: (builder) => ({
    startEngine: builder.query<Engine, number>({
      query: (id: number) =>
        fetchOptions(Methods.patch, Endpoints.engine, {
          id,
          status: StatusEngine.started,
        }),
    }),

    stopEngine: builder.mutation<Engine, number>({
      query: (id: number) =>
        fetchOptions(Methods.patch, Endpoints.engine, {
          id,
          status: StatusEngine.stopped,
        }),
    }),

    getEngineStatus: builder.query<number | undefined, number>({
      query: (id: number) =>
        fetchOptions(Methods.patch, Endpoints.engine, {
          id,
          status: StatusEngine.drive,
        }),
    }),
  }),
});

export const {
  useLazyStartEngineQuery,
  useStopEngineMutation,
  useLazyGetEngineStatusQuery,
} = engineApi;
export default engineApi;
