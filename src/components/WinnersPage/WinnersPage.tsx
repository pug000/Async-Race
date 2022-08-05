import React, { useEffect, useState } from 'react';
import Car from '@/assets/icons/Car.svg';
import { SetState } from '@/ts/types';
import { getTotalCount } from '@/utils';
import { Winner } from '@/ts/interfaces';
import styles from './WinnersPage.module.scss';

interface WinnersPageProps {
  isGaragePage: boolean;
  getWinners: (pages: number) => void;
  winners: Winner[];
  totalWinners: number;
  currentPage: number;
  setCurrentPage: SetState<number>;
}

function WinnersPage(
  {
    isGaragePage,
    getWinners,
    winners,
    totalWinners,
    currentPage,
    setCurrentPage,
  }: WinnersPageProps,
) {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => { getWinners(currentPage); }, [currentPage]);

  useEffect(() => setTotalPages(getTotalCount(totalWinners, 10)), [totalWinners]);

  return (
    <div className={styles.winners} style={{ display: !isGaragePage ? 'flex' : 'none' }}>
      <h2 className={styles.winnersTitleWinners}>{`Winners (${totalWinners})`}</h2>
      <h3 className={styles.winnersTitlePage}>{`Page #${currentPage}`}</h3>
      <table className={styles.winnersTable}>
        <thead className={styles.winnersTableHeader}>
          <tr>
            <th>Number</th>
            <th>Car</th>
            <th>Name</th>
            <th>Wins</th>
            <th>Best time (s)</th>
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
