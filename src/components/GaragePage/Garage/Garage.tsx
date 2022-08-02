import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Button, CarData } from '@/ts/interfaces';
import CarSvg from '@/assets/icons/Car.svg';
import { getTotalCount } from '@/utils';
import BtnId from '@/ts/enum';
import FinishFlag from '@/assets/icons/FinishFlag.svg';
import styles from './Garage.module.scss';

interface GarageProps {
  cars: CarData[],
  currentPage: number,
  totalCars: number,
  isGarageLoading: boolean,
  changePage: (page: number) => void;
  selectOnClick: (item: CarData) => void;
  removeOnClick: (item: CarData) => void;
  startOnClick: (id: number, driving: (progress: number, id: number) => void) => void;
  resetOnClick: (id: number, reset: (id: number) => void) => void;
}

function Garage(
  {
    cars,
    currentPage,
    totalCars,
    isGarageLoading,
    changePage,
    selectOnClick,
    removeOnClick,
    startOnClick,
    resetOnClick,
  }: GarageProps,
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
  const btnsSelect: Button[] = [
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
  ];

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

  const reset = (id: number) => {
    const currElem = carRef.current[id];
    if (currElem) {
      currElem.style.left = '0%';
    }
  };

  const addStarted = (carId: number) => {
    startOnClick(carId, driving);
    setStarted((prev) => [...prev, carId]);
  };

  const removeStarted = (car: CarData) => {
    resetOnClick(car.id, reset);
    setStarted((prev) => prev.filter((el) => el !== car.id));
  };
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
      <div className={styles.garageContainer}>
        <h3 className={styles.garageContainerTitle}>{`Page #${currentPage}`}</h3>
        {cars.map((item) => (
          <div className={styles.carItem} key={item.id}>
            <div className={styles.carItemTop}>
              {btnsSelect.map((btn) => (
                <button
                  className={styles.carItemTopBtn}
                  key={btn.id}
                  type="button"
                  onClick={() => handleEvent(btn, item)}
                >
                  {btn.text}
                </button>
              ))}
              <h4 className={styles.carItemTitle}>{item.name}</h4>
            </div>
            <div className={styles.carItemWrapper}>
              <button
                className={styles.carItemWrapperBtn}
                type="button"
                disabled={isStarted.includes(item.id)}
                onClick={() => addStarted(item.id)}
              >
                S
              </button>
              <button
                className={styles.carItemWrapperBtn}
                type="button"
                disabled={!isStarted.includes(item.id)}
                onClick={() => removeStarted(item)}
              >
                R
              </button>
              <div className={styles.carItemRoad}>
                <div className={styles.carItemTrack}>
                  <div
                    className={styles.carItemImg}
                    ref={(el) => { carRef.current[item.id] = el; }}
                  >
                    <CarSvg fill={item.color} />
                  </div>
                </div>
                <div className={styles.carItemFinish}>
                  <FinishFlag className={styles.carItemFinishFlag} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.garagePagination}>
          <button
            className={styles.garagePaginationBtn}
            type="button"
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            Prev
          </button>
          <button
            className={styles.garagePaginationBtn}
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

export default Garage;
