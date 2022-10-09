import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl, fetchOptions } from 'api';

import { Endpoints, Methods } from 'ts/enum';
import { ApiResponse, CarData } from 'ts/interfaces';

interface GetCarsQueryParams {
  page: number;
  limit: number;
}

const garageApi = createApi({
  reducerPath: 'garageApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Cars'],
  endpoints: (builder) => ({
    getAllCars: builder.query<ApiResponse<CarData>, GetCarsQueryParams>({
      query: ({ page, limit }) =>
        fetchOptions(Methods.get, Endpoints.garage, {
          _page: page,
          _limit: limit,
        }),
      transformResponse: (data: CarData[], meta): ApiResponse<CarData> => ({
        data,
        totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Cars' as const, id })),
              'Cars',
            ]
          : ['Cars'],
    }),

    getCar: builder.query<CarData, number>({
      query: (id: number) => `${Endpoints.garage}${id}`,
    }),

    createCar: builder.mutation<CarData, CarData | Omit<CarData, 'id'>>({
      query: (body: CarData) => ({
        ...fetchOptions(Methods.post, Endpoints.garage),
        body,
      }),
      invalidatesTags: ['Cars'],
    }),

    editCar: builder.mutation<CarData, CarData>({
      query: (body: CarData) => ({
        ...fetchOptions(Methods.put, `${Endpoints.garage}${body.id}`),
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Cars', id: arg.id }],
    }),

    removeCar: builder.mutation<CarData, CarData>({
      query: (body: CarData) =>
        fetchOptions(Methods.delete, `${Endpoints.garage}${body.id}`),
      invalidatesTags: (result, error, arg) => [{ type: 'Cars', id: arg.id }],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useLazyGetCarQuery,
  useCreateCarMutation,
  useRemoveCarMutation,
  useEditCarMutation,
} = garageApi;
export default garageApi;
