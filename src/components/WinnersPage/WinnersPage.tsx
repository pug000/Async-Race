import React, { useEffect, useState } from 'react';
import Car from '@/assets/icons/Car.svg';
import { SetState } from '@/ts/types';
import { getTotalCount } from '@/utils';
import { SortBy, TableHeadTh, Winner } from '@/ts/interfaces';
import BtnId from '@/ts/enum';
import styles from './WinnersPage.module.scss';

interface WinnersPageProps {
  isGaragePage: boolean;
  getWinners: (pages: number, type: string, order: string) => void;
  winners: Winner[];
  totalWinners: number;
  currentPage: number;
  setCurrentPage: SetState<number>;
  sortWinners: SortBy;
  toggleSort: (text: string) => void;
}

function WinnersPage(
  {
    isGaragePage,
    getWinners,
    winners,
    totalWinners,
    currentPage,
    setCurrentPage,
    sortWinners,
    toggleSort,
  }: WinnersPageProps,
) {
  const [totalPages, setTotalPages] = useState(0);
  const [tableHeadTh, setTableHeadTh] = useState<TableHeadTh[]>([
    { id: 1, text: 'Number' },
    { id: 2, text: 'Car' },
    { id: 3, text: 'Name' },
    {
      id: 4, text: 'Wins', isASC: false, isDESC: false
    },
    {
      id: 5, text: 'Best time (s)', isASC: false, isDESC: false
    }
  ]);

  useEffect(() => {
    getWinners(currentPage, sortWinners.type, sortWinners.order);
  }, [currentPage, sortWinners]);

  useEffect(() => setTotalPages(getTotalCount(totalWinners, 10)), [totalWinners]);

  const toggleSortBy = (text: string, id: number) => {
    toggleSort(text);
    setTableHeadTh((prev) => prev.map((el) => (
      {
        ...el,
        isASC: el.id === id && sortWinners.order === 'ASC',
        isDESC: el.id === id && sortWinners.order === 'DESC',
      })));
  };

  const handleEvent = (id: number) => {
    switch (id) {
      case BtnId.fourth:
        return toggleSortBy('wins', id);
      case BtnId.fifth:
        return toggleSortBy('time', id);
      default:
        return id;
    }
  };

  return (
    <div className={styles.winners} style={{ display: !isGaragePage ? 'flex' : 'none' }}>
      <h2 className={styles.winnersTitleWinners}>{`Winners (${totalWinners})`}</h2>
      <h3 className={styles.winnersTitlePage}>{`Page #${currentPage}`}</h3>
      <table className={styles.winnersTable}>
        <thead>
          <tr>
            {tableHeadTh.map(({
              id, text, isASC, isDESC
            }) => (
              <th
                key={id}
                onClick={() => handleEvent(id)}
              >
                {text}
                {isDESC ? (<span>&#8593;</span>) : ''}
                {isASC ? (<span>&#8595;</span>) : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {winners.map((
            {
              id,
              wins,
              time,
              name,
              color,
            },
            index
          ) => (
            <tr key={id}>
              <th>{index + 1}</th>
              <th>
                <Car className={styles.winnersCar} fill={color} />
              </th>
              <th>{name}</th>
              <th>{wins}</th>
              <th>{time}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.winnersPagination}>
        <button
          className={styles.winnersPaginationBtn}
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <button
          className={styles.winnersPaginationBtn}
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WinnersPage;
