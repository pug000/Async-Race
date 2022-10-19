import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { limitWinnersPerPage } from 'utils';

import { baseUrl, fetchOptions } from 'api';

import { Endpoints, Methods } from 'ts/enum';
import { ApiResponse, Winner } from 'ts/interfaces';
import { CreatedNewWinner } from 'ts/types';

interface GetWinnersQueryParams {
  page: number;
  type: string;
  order: string;
  limit?: number;
}

const winnersApi = createApi({
  reducerPath: 'winnersApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Winners'],
  endpoints: (builder) => ({
    getAllWinners: builder.query<ApiResponse<Winner>, GetWinnersQueryParams>({
      query: ({ page, type, order, limit = limitWinnersPerPage }) =>
        fetchOptions(Methods.get, Endpoints.winners, {
          _page: page,
          _sort: type,
          _order: order,
          _limit: limit,
        }),
      transformResponse: (data: Winner[], meta): ApiResponse<Winner> => ({
        data,
        totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Winners' as const,
                id,
              })),
              'Winners',
            ]
          : ['Winners'],
    }),
    getWinner: builder.query<Winner, number>({
      query: (id: number) =>
        fetchOptions(Methods.get, `${Endpoints.winners}${id}`),
    }),
    createWinner: builder.mutation<Winner, CreatedNewWinner>({
      query: (body: CreatedNewWinner) => ({
        ...fetchOptions(Methods.post, `${Endpoints.winners}`),
        body,
      }),
      invalidatesTags: ['Winners'],
    }),
    editWinner: builder.mutation<Winner, Winner>({
      query: (body: Winner) => ({
        ...fetchOptions(Methods.put, `${Endpoints.winners}${body.id}`),
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Winners', id: arg.id },
      ],
    }),
    removeWinner: builder.mutation<Winner, number>({
      query: (id: number) =>
        fetchOptions(Methods.delete, `${Endpoints.winners}${id}`),
      invalidatesTags: ['Winners'],
    }),
  }),
});

export const {
  useGetAllWinnersQuery,
  useLazyGetWinnerQuery,
  useEditWinnerMutation,
  useCreateWinnerMutation,
  useRemoveWinnerMutation,
} = winnersApi;
export default winnersApi;
