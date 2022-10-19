import React, { useCallback, useEffect, useState } from 'react';

import { useLazyGetCarQuery } from 'redux/services/garageService';
import {
  useCreateWinnerMutation,
  useEditWinnerMutation,
  useGetAllWinnersQuery,
  useLazyGetWinnerQuery,
} from 'redux/services/winnersService';
import {
  setCurrentPage,
  setNewWinner,
  setSortFields,
  setTotalPages,
  setWinners,
} from 'redux/slices/winnersSlice';

import Pagination from 'components/Pagination/Pagination';

import { getTotalCount, initialTableHeadThs, limitWinnersPerPage } from 'utils';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { TableHeadTh, Winner } from 'ts/interfaces';
import { CreatedNewWinner } from 'ts/types';

import { Title, TitlePage } from 'styles/styles';

import {
  CarIcon,
  Winners,
  WinnersTable,
  WinnersTableBody,
  WinnersTableHead,
  WinnersText,
  WinnersTh,
  WinnersTr,
} from './WinnerPage.style';

type MapEvent = Record<string, (id: number, text: string) => void>;

function WinnersPage() {
  const { isGaragePage } = useAppSelector((state) => state.garage);
  const { newWinner, currentPage, sortFields, winners, totalPages } =
    useAppSelector((state) => state.winners);
  const { data: winnersData } = useGetAllWinnersQuery({
    page: currentPage,
    ...sortFields,
    limit: limitWinnersPerPage,
  });
  const [triggerGetWinner] = useLazyGetWinnerQuery();
  const [triggerGetCar] = useLazyGetCarQuery();
  const [createWinner] = useCreateWinnerMutation();
  const [editWinner] = useEditWinnerMutation();
  const dispatch = useAppDispatch();
  const [tableHeadThs, setTableHeadThs] =
    useState<TableHeadTh[]>(initialTableHeadThs);

  const getAllWinners = useCallback(async () => {
    if (winnersData) {
      const data: Winner[] = await Promise.all(
        winnersData.data.map(async (winner) => {
          const { data: result } = await triggerGetCar(winner.id);
          const name = result?.name ?? '';
          const color = result?.color ?? '';
          return { ...winner, name, color };
        })
      );

      dispatch(setWinners(data));
    }
  }, [winnersData?.data]);

  const saveWinner = useCallback(async () => {
    if (newWinner) {
      const { isSuccess, data: winner } = await triggerGetWinner(newWinner.id);

      if (!isSuccess) {
        const createdNewWinner: CreatedNewWinner = {
          id: newWinner.id,
          time: newWinner.time,
          wins: 1,
        };

        await createWinner(createdNewWinner);
      } else {
        const highScoreTime =
          newWinner.time < winner.time ? newWinner.time : winner.time;
        const updatedWinner: Winner = {
          ...winner,
          time: highScoreTime,
          wins: winner.wins + 1,
        };

        await editWinner(updatedWinner);
      }
    }
  }, [newWinner]);

  useEffect(() => {
    saveWinner();
    setTimeout(() => {
      dispatch(setNewWinner(undefined));
    }, 2000);
  }, [newWinner]);

  useEffect(() => {
    if (winnersData?.totalCount) {
      dispatch(
        setTotalPages(
          getTotalCount(winnersData?.totalCount, limitWinnersPerPage)
        )
      );
    }
  }, [winnersData?.totalCount]);

  useEffect(() => {
    getAllWinners();
  }, [winnersData]);

  const toggleSortBy = useCallback(
    (id: number, type = '') => {
      dispatch(setSortFields(type));
      setTableHeadThs((prev) =>
        prev.map((el) => ({
          ...el,
          isASC: el.id === id && sortFields.order === 'ASC',
          isDESC: el.id === id && sortFields.order === 'DESC',
        }))
      );
    },
    [tableHeadThs]
  );

  const sortWinnersOnClick = useCallback(
    (id: number, type = '') => {
      const map: MapEvent = {
        [id]: toggleSortBy,
      };

      return map[id](id, type);
    },
    [tableHeadThs]
  );

  return (
    <Winners active={isGaragePage}>
      <Title>{`Winners (${winnersData?.totalCount ?? 0})`}</Title>
      <TitlePage>{`Page #${currentPage}`}</TitlePage>
      <WinnersTable>
        <WinnersTableHead>
          <WinnersTr>
            {tableHeadThs.map(
              ({ id, text, isASC, isDESC, isClickable, type }) => (
                <WinnersTh
                  key={id}
                  onClick={() => sortWinnersOnClick(id, type)}
                  $isClickable={isClickable}
                >
                  {text}
                  <WinnersText $isDESC={isDESC} $isASC={isASC} />
                </WinnersTh>
              )
            )}
          </WinnersTr>
        </WinnersTableHead>
        <WinnersTableBody>
          {winners.map(({ id, wins, time, name, color }, index) => (
            <WinnersTr key={id}>
              <WinnersTh>{index + 1}</WinnersTh>
              <WinnersTh>
                <CarIcon fill={color} />
              </WinnersTh>
              <WinnersTh>{name}</WinnersTh>
              <WinnersTh>{wins}</WinnersTh>
              <WinnersTh>{time}</WinnersTh>
            </WinnersTr>
          ))}
        </WinnersTableBody>
      </WinnersTable>
      <Pagination
        isPrevButtonDisabled={currentPage <= 1}
        isNextButtonDisabled={currentPage >= totalPages}
        prevPageOnClick={() => dispatch(setCurrentPage(currentPage - 1))}
        nextPageOnClick={() => dispatch(setCurrentPage(currentPage + 1))}
      />
    </Winners>
  );
}

export default WinnersPage;
