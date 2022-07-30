import React, { useEffect, useState } from 'react';
import { Button, CarData } from '@/ts/interfaces';
import CarSvg from '@/assets/icons/Car.svg';
import BtnId from '@/ts/enum';
import { getTotalCount } from '@/utils';

import styles from './Pagination.module.scss';

interface PaginationProps {
  cars: CarData[],
  currentPage: number,
  totalCars: number,
  isGarageLoading: boolean,
  changePage: (page: number) => void;
  selectOnClick: (item: CarData) => void;
  removeOnClick: (item: CarData) => void;
}

function Pagination(
  {
    cars,
    currentPage,
    totalCars,
    isGarageLoading,
    changePage,
    selectOnClick,
    removeOnClick,
  }: PaginationProps,
) {
  if (isGarageLoading) {
    return (
      <div className={styles.garageLoading}>
        <h2 className={styles.garageLoadingTitle}>Loading in progress...</h2>
      </div>
    );
  }

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(getTotalCount(totalCars));
  }, [totalCars]);

  const onPrevious = () => changePage(currentPage - 1);

  const onNext = () => changePage(currentPage + 1);

  const [btns] = useState<Button[]>([
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
    { id: 3, text: 'Start' },
    { id: 4, text: 'Stop' },
  ]);

  const handleEvent = (currentBtn: Button, currentCar: CarData) => {
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
      <h2 className={styles.garageTitle}>{`Garage(${totalCars})`}</h2>
      <div className={styles.garagePagination}>
        <h3 className={styles.garagePaginationTitle}>{`Page #${currentPage}`}</h3>
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
          <button
            className={styles.garagePaginationWrapperBtn}
            type="button"
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            Prev
          </button>
          <button
            className={styles.garagePaginationWrapperBtn}
            type="button"
            disabled={currentPage === totalPages}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
