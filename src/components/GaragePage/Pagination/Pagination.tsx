import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { CarData } from '@/ts/interfaces';
import CarSvg from '@/assets/icons/Car.svg';
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
  startOnClick: (id: number, driving: (progress: number, id: number) => void) => void;
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
    startOnClick,
  }: PaginationProps,
) {
  if (isGarageLoading) {
    return (
      <div className={styles.garageLoading}>
        <h2 className={styles.garageLoadingTitle}>Loading in progress...</h2>
      </div>
    );
  }

  const carRef = useRef<(HTMLDivElement | null)[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isStarted, setStarted] = useState<number[]>([]);

  useEffect(() => {
    setTotalPages(getTotalCount(totalCars));
  }, [totalCars]);

  const onPrevious = () => changePage(currentPage - 1);

  const onNext = () => changePage(currentPage + 1);

  const driving = (progress: number, id: number) => {
    const currElem = carRef.current[id];

    if (currElem) {
      currElem.style.left = `${progress * 100}%`;
    }
  };

  const resetOnClick = (car: CarData) => {
    const currElem = carRef.current[car.id];
    if (currElem) {
      currElem.style.left = '0%';
    }
  };

  const addStarted = (carId: number) => {
    startOnClick(carId, driving);
    setStarted((prev) => [...prev, carId]);
  };

  const removeStarted = (car: CarData) => {
    resetOnClick(car);
    setStarted((prev) => prev.filter((el) => el !== car.id));
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
              <button
                className={styles.carItemTopBtn}
                type="button"
                disabled={isStarted.includes(item.id)}
                onClick={() => addStarted(item.id)}
              >
                Start
              </button>
              <button
                className={styles.carItemTopBtn}
                type="button"
                disabled={!isStarted.includes(item.id)}
                onClick={() => removeStarted(item)}
              >
                Stop
              </button>
            </div>
            <div className={styles.carItemWrapper}>
              <div className={styles.carItemTrack}>
                <div className={styles.carItemImg} ref={(el) => { carRef.current[item.id] = el; }}>
                  <CarSvg fill={item.color} />
                </div>
              </div>
              <div className={styles.carItemFinish} />
            </div>
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
