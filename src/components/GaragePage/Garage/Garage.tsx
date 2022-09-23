import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import GarageContext from 'components/Context/GarageContext';

import {
  startOrStopEngine,
  statusEngine
} from 'api';
import {
  getDuration,
  getTotalCount,
  useAnimationFrame
} from 'utils';

import CarSvg from 'assets/icons/Car.svg';
import FinishFlag from 'assets/icons/FinishFlag.svg';

import BtnId from 'ts/enum';
import {
  Button,
  CarData
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import styles from './Garage.module.scss';

interface GarageProps {
  isRaceStarted: boolean;
  selectOnClick: (car: CarData) => void;
  removeOnClick: (car: CarData) => void;
  setSelectedCar: SetState<CarData | null>;
}

function Garage(
  {
    isRaceStarted,
    selectOnClick,
    removeOnClick,
    setSelectedCar,
  }: GarageProps,
) {
  const {
    cars,
    totalCars,
    newWinner,
    errorMessage,
    currentGaragePage,
    getNewWinner,
    setCurrentGaragePage,
  } = useContext(GarageContext);
  const [totalPages, setTotalPages] = useState(0);
  const carRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isStartedEngine, setStartedEngine] = useState<number[]>([]);
  const duration = useRef(0);
  const mapRef = useRef<Record<number, number>>({});
  const btnsSelect: Button[] = [
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
  ];

  useEffect(() => setTotalPages(getTotalCount(totalCars, 7)), [totalCars]);

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

  const driving = (progress: number, index: number) => {
    const currElem = carRef.current[index];

    if (currElem) {
      currElem.style.left = `${progress * 100}%`;
    }
  };

  const reset = (index: number) => {
    const currElem = carRef.current[index];
    if (currElem) {
      currElem.style.left = '0%';
    }
  };

  const toggleDisable = (id: number) => isStartedEngine.includes(id);

  const startEngine = async (car: CarData, index: number) => {
    const { velocity, distance } = await startOrStopEngine(statusEngine.started, car.id);
    duration.current = getDuration(velocity, distance);
    setStartedEngine((prev) => [...prev, car.id]);
    const success = await useAnimationFrame(
      car.id,
      index,
      duration.current,
      driving,
      mapRef.current,
    );

    const result = {
      name: car.name,
      id: car.id,
      time: Number((duration.current / 1000).toFixed(2)),
    };

    return success ? result : Promise.reject();
  };

  const stopEngine = async (car: CarData, index: number) => {
    await startOrStopEngine(statusEngine.stopped, car.id);
    cancelAnimationFrame(mapRef.current[car.id]);
    reset(index);
    setStartedEngine((prev) => prev.filter((el) => el !== car.id));
  };

  useEffect(() => {
    if (isRaceStarted) {
      Promise.any(cars.map((car, i) => startEngine(car, i)))
        .then((data) => getNewWinner(data));
      setSelectedCar(null);
    } else {
      Promise.all(cars.map((car, i) => stopEngine(car, i)));
    }
  }, [isRaceStarted]);

  useEffect(() => {
    if (currentGaragePage !== 1 && !cars.length) {
      setCurrentGaragePage(currentGaragePage - 1);
    }
  }, [cars.length]);

  if (errorMessage) {
    return (
      <div className={styles.garageError}>
        <h2 className={styles.garageErrorTitle}>{`Error: ${errorMessage}`}</h2>
      </div>
    );
  }

  return (
    <div className={styles.garage}>
      <h2 className={styles.garageTitle}>{`Garage(${totalCars})`}</h2>
      <div className={styles.garageContainer}>
        <h3 className={styles.garageContainerTitle}>{`Page #${currentGaragePage}`}</h3>
        {cars.map((item, i) => (
          <div className={styles.carItem} key={item.id}>
            <div className={styles.carItemTop}>
              {btnsSelect.map((btn) => (
                <button
                  className={styles.carItemTopBtn}
                  key={btn.id}
                  type="button"
                  disabled={toggleDisable(item.id)}
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
                disabled={toggleDisable(item.id)}
                onClick={() => startEngine(item, i)}
              >
                S
              </button>
              <button
                className={styles.carItemWrapperBtn}
                type="button"
                disabled={!toggleDisable(item.id)}
                onClick={() => stopEngine(item, i)}
              >
                R
              </button>
              <div className={styles.carItemRoad}>
                <div className={styles.carItemTrack}>
                  <div
                    className={styles.carItemImg}
                    ref={(el) => { carRef.current[i] = el; }}
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
            disabled={currentGaragePage <= 1 || isStartedEngine.length > 0}
            onClick={() => setCurrentGaragePage(currentGaragePage - 1)}
          >
            Prev
          </button>
          <button
            className={styles.garagePaginationBtn}
            type="button"
            disabled={currentGaragePage >= totalPages || isStartedEngine.length > 0}
            onClick={() => setCurrentGaragePage(currentGaragePage + 1)}
          >
            Next
          </button>
        </div>
      </div>
      {!!newWinner && (
        <div className={styles.popupNotify}>
          <div className={styles.popupNotifyContainer}>
            <h4 className={styles.popupNotifyContainerTitle}>{`${newWinner.name} went first (${newWinner.time}s)!`}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Garage;
