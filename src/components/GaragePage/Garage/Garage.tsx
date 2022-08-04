import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { Button, CarData } from '@/ts/interfaces';
import CarSvg from '@/assets/icons/Car.svg';
import { getTotalCount } from '@/utils';
import BtnId from '@/ts/enum';
import FinishFlag from '@/assets/icons/FinishFlag.svg';
import GarageContext from '@/components/Context/GarageContext';
import styles from './Garage.module.scss';

interface GarageProps {
  currentPage: number;
  isStartedEngine: number[];
  carRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
  changePage: (page: number) => void;
  selectOnClick: (item: CarData) => void;
  removeOnClick: (item: CarData) => void;
  startOnClick: (car: CarData, index: number) => void;
  resetOnClick: (id: number, index: number) => void;
}

function Garage(
  {
    currentPage,
    isStartedEngine,
    carRef,
    changePage,
    selectOnClick,
    removeOnClick,
    startOnClick,
    resetOnClick,
  }: GarageProps,
) {
  const { cars, totalCars, newWinner } = useContext(GarageContext);
  const [totalPages, setTotalPages] = useState(0);
  const btnsSelect: Button[] = [
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
  ];

  const ref = carRef.current;

  useEffect(() => {
    setTotalPages(getTotalCount(totalCars));
  }, [totalCars]);

  const onPrevious = () => changePage(currentPage - 1);

  const onNext = () => changePage(currentPage + 1);

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
        {cars.map((item, i) => (
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
                disabled={isStartedEngine.includes(item.id)}
                onClick={() => startOnClick(item, i)}
              >
                S
              </button>
              <button
                className={styles.carItemWrapperBtn}
                type="button"
                disabled={!isStartedEngine.includes(item.id)}
                onClick={() => resetOnClick(item.id, i)}
              >
                R
              </button>
              <div className={styles.carItemRoad}>
                <div className={styles.carItemTrack}>
                  <div
                    className={styles.carItemImg}
                    ref={(el) => { ref[i] = el; }}
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
      {!!newWinner && (
        <div className={styles.popupNotify}>
          <div className={styles.popupNotifyContainer}>
            <h4 className={styles.popupNotifyContainerTitle}>{`${newWinner.name} went first (${newWinner.time})s!`}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Garage;
