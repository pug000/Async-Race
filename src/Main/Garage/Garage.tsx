import React from 'react';
import { CarData } from '../../ts/interfaces';
import CarSvg from '../../assets/icons/Car.svg';
import styles from './Garage.module.scss';

interface GarageProps {
  cars: CarData[],
  isGarageLoading: boolean,
  selectOnClick: (item: CarData) => void;
  removeOnClick: (item: CarData) => void;
}

function Garage(
  {
    cars,
    isGarageLoading,
    selectOnClick,
    removeOnClick,
  }: GarageProps,
) {
  if (isGarageLoading) {
    return (
      <div className={styles.garageLoading}>
        <h2 className={styles.garageLoadingTitle}>Loading in progress...</h2>
      </div>
    );
  }

  return (
    <div className={styles.garage}>
      <h2 className={styles.garageTitle}>{`Garage(${cars.length})`}</h2>
      <div className={styles.garagePagination}>
        <h3 className={styles.garagePaginationTitle}>Page</h3>
        {cars.map((item) => (
          <div className={styles.carItem} key={item.id}>
            <h4 className={styles.carItemTitle}>{item.name}</h4>
            <div className={styles.carItemTop}>
              <button
                className={styles.carItemTopBtn}
                type="button"
                onClick={() => selectOnClick(item)}
              >
                Select
              </button>
              <button
                className={styles.carItemTopBtn}
                type="button"
                onClick={() => removeOnClick(item)}
              >
                Remove
              </button>
              <button className={styles.carItemTopBtn} type="button">Start</button>
              <button className={styles.carItemTopBtn} type="button">Stop</button>
            </div>
            <CarSvg className={styles.carItemImg} fill={item.color} />
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
