import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import GarageContext from 'components/Context/GarageContext';
import Pagination from 'components/Pagination/Pagination';
import PopupNotify from 'components/PopupNotify/PopupNotify';
import Button from 'components/Button/Button';

import {
  startOrStopEngine,
  statusEngine
} from 'api';
import {
  getDuration,
  getTotalCount,
  startAnimation
} from 'utils';

import ButtonId from 'ts/enum';
import {
  ButtonState,
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
  CarItemTrack,
  CarItemWrapper,
  GarageContainer,
  GarageError,
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
  const buttonsSelect: ButtonState[] = [
    { id: 1, text: 'Select' },
    { id: 2, text: 'Remove' },
  ];

  useEffect(() => {
    setTotalPages(getTotalCount(totalCars, 7));
  }, [totalCars]);

  const handleEvent = (currentButton: ButtonState, currentCar: CarData) => {
    switch (currentButton.id) {
      case ButtonId.first:
        return selectOnClick(currentCar);
      case ButtonId.second:
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
      Promise.any(cars.map((car, index) => startEngine(car, index)))
        .then((data) => getNewWinner(data));
      setSelectedCar(null);
    } else {
      Promise.all(cars.map((car, index) => stopEngine(car, index)));
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
              {buttonsSelect.map((button) => (
                <Button
                  key={button.id}
                  text={button.text}
                  disabled={toggleDisable(item.id)}
                  callback={() => handleEvent(button, item)}
                />
              ))}
              <CarItemTitle>{item.name}</CarItemTitle>
            </CarItemTop>
            <CarItemWrapper>
              <Button
                text="S"
                disabled={toggleDisable(item.id)}
                isStartButton
                callback={() => startEngine(item, index)}
              />
              <Button
                text="R"
                disabled={!toggleDisable(item.id)}
                isStopButton
                callback={() => stopEngine(item, index)}
              />
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
        <PopupNotify
          title={`${newWinner.name} went first (${newWinner.time}s)!`}
        />
      )}
    </StyledGarage>
  );
}

export default Garage;
