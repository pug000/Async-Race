import React, { useState } from 'react';
import { CarButton, CarData } from '../../ts/interfaces';
import CarSvg from '../../assets/icons/Car.svg';
import styles from './Garage.module.scss';
import BtnId from '../../ts/enum';

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

  const [btns] = useState<CarButton[]>([
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
    { id: 3, text: 'Start' },
    { id: 4, text: 'Stop' },
  ]);

  const handleEvent = (currentBtn: CarButton, currentCar: CarData) => {
    switch (currentBtn.id) {
      case BtnId.first:
        return selectOnClick(currentCar);
      case BtnId.second:
        return removeOnClick(currentCar);
      default:
        return currentCar;
    }
  };

  return (
    <div className={styles.garage}>
      <h2 className={styles.garageTitle}>{`Garage(${cars.length})`}</h2>
      <div className={styles.garagePagination}>
        <h3 className={styles.garagePaginationTitle}>Page</h3>
        {cars.map((item) => (
          <div className={styles.carItem} key={item.id}>
            <h4 className={styles.carItemTitle}>{item.name}</h4>
            <div className={styles.carItemTop}>
              {btns.map((btn) => (
                <button
                  className={styles.carItemTopBtn}
                  key={btn.id}
                  type="button"
                  onClick={() => handleEvent(btn, item)}
                >
                  {btn.text}
                </button>
              ))}
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
