import React from 'react';
import Car from '@/assets/icons/Car.svg';
import styles from './WinnersPage.module.scss';

interface WinnersPageProps {
  isGaragePage: boolean;
}

function WinnersPage(
  {
    isGaragePage,
  }: WinnersPageProps,
) {
  return (
    <div className={styles.winners} style={{ display: !isGaragePage ? 'flex' : 'none' }}>
      <h2 className={styles.winnersTitleWinners}>Winners</h2>
      <h3 className={styles.winnersTitlePage}>Page</h3>
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
          <tr>
            <th>1</th>
            <th>
              <Car className={styles.winnersCar} fill="#fffff" />
            </th>
            <th>Tesla</th>
            <th>1</th>
            <th>3.00</th>
          </tr>
        </tbody>
      </table>
      <div className={styles.winnersPagination}>
        <button className={styles.winnersPaginationBtn} type="button">prev</button>
        <button className={styles.winnersPaginationBtn} type="button">next</button>
      </div>
    </div>
  );
}

export default WinnersPage;
