import React, { useEffect, useState } from 'react';

import Pagination from 'components/Pagination/Pagination';

import { getTotalCount } from 'utils';

import ButtonId from 'ts/enum';
import { SortBy, TableHeadTh, Winner } from 'ts/interfaces';
import { SetState } from 'ts/types';

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

interface WinnersPageProps {
  isGaragePage: boolean;
  winners: Winner[];
  totalWinners: number;
  currentPage: number;
  setCurrentPage: SetState<number>;
  sortWinners: SortBy;
  toggleSort: (text: string) => void;
}

function WinnersPage({
  isGaragePage,
  winners,
  totalWinners,
  currentPage,
  setCurrentPage,
  sortWinners,
  toggleSort,
}: WinnersPageProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [tableHeadTh, setTableHeadTh] = useState<TableHeadTh[]>([
    { id: 1, text: 'Number', isClickable: false },
    { id: 2, text: 'Car', isClickable: false },
    { id: 3, text: 'Name', isClickable: false },
    {
      id: 4,
      text: 'Wins',
      isASC: false,
      isDESC: false,
      isClickable: true,
    },
    {
      id: 5,
      text: 'Best time (s)',
      isASC: false,
      isDESC: false,
      isClickable: true,
    },
  ]);

  useEffect(() => {
    setTotalPages(getTotalCount(totalWinners, 10));
  }, [totalWinners]);

  const toggleSortBy = (text: string, id: number) => {
    toggleSort(text);
    setTableHeadTh((prev) =>
      prev.map((el) => ({
        ...el,
        isASC: el.id === id && sortWinners.order === 'ASC',
        isDESC: el.id === id && sortWinners.order === 'DESC',
      }))
    );
  };

  const handleEvent = (id: number) => {
    switch (id) {
      case ButtonId.fourth:
        return toggleSortBy('wins', id);
      case ButtonId.fifth:
        return toggleSortBy('time', id);
      default:
        return id;
    }
  };

  return (
    <Winners active={isGaragePage}>
      <Title>{`Winners (${totalWinners})`}</Title>
      <TitlePage>{`Page #${currentPage}`}</TitlePage>
      <WinnersTable>
        <WinnersTableHead>
          <WinnersTr>
            {tableHeadTh.map(({ id, text, isASC, isDESC, isClickable }) => (
              <WinnersTh
                key={id}
                onClick={() => handleEvent(id)}
                $isClickable={isClickable}
              >
                {text}
                <WinnersText $isDESC={isDESC} $isASC={isASC} />
              </WinnersTh>
            ))}
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
        prevPageOnClick={() => setCurrentPage(currentPage - 1)}
        nextPageOnClick={() => setCurrentPage(currentPage + 1)}
      />
    </Winners>
  );
}

export default WinnersPage;
