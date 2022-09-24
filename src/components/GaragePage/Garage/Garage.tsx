import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import GarageContext from 'components/Context/GarageContext';
import Pagination from 'components/Pagination/Pagination';

import {
  startOrStopEngine,
  statusEngine
} from 'api';
import {
  getDuration,
  getTotalCount,
  startAnimation
} from 'utils';

import BtnId from 'ts/enum';
import {
  Button,
  CarData
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import {
  Title,
  TitlePage
} from 'styles/styles';
import {
  CarItem,
  CarItemFinish,
  CarItemFinishSvg,
  CarItemImg,
  CarItemRoad,
  CarIcon,
  CarItemTitle,
  CarItemTop,
  CarItemTopButton,
  CarItemTrack,
  CarItemWrapper,
  CarItemWrapperButton,
  GarageContainer,
  GarageError,
  PopupNotify,
  PopupNotifyContainer,
  PopupNotifyContainerTitle,
  StyledGarage
} from './Garage.style';

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

  useEffect(() => {
    setTotalPages(getTotalCount(totalCars, 7));
  }, [totalCars]);

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

  const drive = (progress: number, index: number) => {
    const currentCarElement = carRef.current[index];

    if (currentCarElement) {
      currentCarElement.style.left = `${progress * 100}%`;
    }
  };

  const reset = (index: number) => {
    const currentCarElement = carRef.current[index];
    if (currentCarElement) {
      currentCarElement.style.left = '0%';
    }
  };

  const toggleDisable = (id: number) => isStartedEngine.includes(id);

  const startEngine = async (car: CarData, index: number) => {
    const { velocity, distance } = await startOrStopEngine(statusEngine.started, car.id);
    duration.current = getDuration(velocity, distance);
    setStartedEngine((prev) => [...prev, car.id]);
    const success = await startAnimation(
      car.id,
      index,
      duration.current,
      drive,
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
      <GarageError>
        <Title>{`Error: ${errorMessage}`}</Title>
      </GarageError>
    );
  }

  return (
    <StyledGarage>
      <Title>{`Garage(${totalCars})`}</Title>
      <GarageContainer>
        <TitlePage>{`Page #${currentGaragePage}`}</TitlePage>
        {cars.map((item, index) => (
          <CarItem key={item.id}>
            <CarItemTop>
              {btnsSelect.map((button) => (
                <CarItemTopButton
                  key={button.id}
                  type="button"
                  disabled={toggleDisable(item.id)}
                  onClick={() => handleEvent(button, item)}
                >
                  {button.text}
                </CarItemTopButton>
              ))}
              <CarItemTitle>{item.name}</CarItemTitle>
            </CarItemTop>
            <CarItemWrapper>
              <CarItemWrapperButton
                type="button"
                disabled={toggleDisable(item.id)}
                onClick={() => startEngine(item, index)}
              >
                S
              </CarItemWrapperButton>
              <CarItemWrapperButton
                type="button"
                disabled={!toggleDisable(item.id)}
                onClick={() => stopEngine(item, index)}
              >
                R
              </CarItemWrapperButton>
              <CarItemRoad>
                <CarItemTrack>
                  <CarItemImg ref={(el) => { carRef.current[index] = el; }}>
                    <CarIcon fill={item.color} />
                  </CarItemImg>
                </CarItemTrack>
                <CarItemFinish>
                  <CarItemFinishSvg />
                </CarItemFinish>
              </CarItemRoad>
            </CarItemWrapper>
          </CarItem>
        ))}
        <Pagination
          isPrevButtonDisabled={currentGaragePage <= 1 || isStartedEngine.length > 0}
          isNextButtonDisabled={currentGaragePage >= totalPages || isStartedEngine.length > 0}
          prevPageOnClick={() => setCurrentGaragePage(currentGaragePage - 1)}
          nextPageOnClick={() => setCurrentGaragePage(currentGaragePage + 1)}
        />
      </GarageContainer>
      {!!newWinner && (
        <PopupNotify>
          <PopupNotifyContainer>
            <PopupNotifyContainerTitle>{`${newWinner.name} went first (${newWinner.time}s)!`}</PopupNotifyContainerTitle>
          </PopupNotifyContainer>
        </PopupNotify>
      )}
    </StyledGarage>
  );
}

export default Garage;
