import React from 'react';
import { CarData } from '../../ts/interfaces';
import Car from '../../assets/icons/Car.svg';
import styles from './Garage.module.scss';

interface GarageProps {
  cars: CarData[],
  isCarLoading: boolean,
}

function Garage(
  {
    cars,
    isCarLoading,
  }: GarageProps,
) {
  if (isCarLoading) {
    return (
      <div className={styles.garageLoading}>
        <h2 className={styles.garageLoadingTitle}>Loading in progress...</h2>
      </div>
    );
  }

  return (
    <div className={styles.garage}>
      <h2 className={styles.garageTitle}>Garage</h2>
      <div className={styles.garagePagination}>
        <h3 className={styles.garagePaginationTitle}>Page</h3>
        {cars.map((item) => (
          <div className={styles.carItem} key={item.id}>
            <h4 className={styles.carItemTitle}>{item.name}</h4>
            <div className={styles.carItemTop}>
              <button className={styles.carItemTopBtn} type="button">Select</button>
              <button className={styles.carItemTopBtn} type="button">Remove</button>
              <button className={styles.carItemTopBtn} type="button">Start</button>
              <button className={styles.carItemTopBtn} type="button">Stop</button>
            </div>
            <Car className={styles.carItemImg} fill={item.color} />
            <div className={styles.carItemTrack} />
          </div>
        ))}
        <div className={styles.garagePaginationWrapper}>
          <button className={styles.garagePaginationWrapperBtn} type="button">Prev</button>
          <button className={styles.garagePaginationWrapperBtn} type="button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default Garage;
