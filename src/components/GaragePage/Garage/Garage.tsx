import React, { useCallback, useEffect, useRef } from 'react';

import {
  useGetAllCarsQuery,
  useLazyGetCarQuery,
  useRemoveCarMutation,
} from 'redux/services/garageService';
import { useRemoveWinnerMutation } from 'redux/services/winnersService';
import {
  setCurrentPage,
  setSelectedCar,
  setTotalPages,
  startCarEngine,
  stopCarEngine,
} from 'redux/slices/garageSlice';
import { setNewWinner } from 'redux/slices/winnersSlice';

import Button from 'components/Button/Button';
import Pagination from 'components/Pagination/Pagination';
import PopupNotify from 'components/PopupNotify/PopupNotify';

import {
  getDuration,
  getTotalCount,
  limitCarsPerPage,
  startAnimation,
} from 'utils';

import { startOrStopEngine } from 'api';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import { StatusEngine } from 'ts/enum';
import { CarData } from 'ts/interfaces';

import { Title, TitlePage } from 'styles/styles';

import {
  CarIcon,
  CarItem,
  CarItemFinish,
  CarItemFinishSvg,
  CarItemImg,
  CarItemRoad,
  CarItemTitle,
  CarItemTop,
  CarItemTrack,
  CarItemWrapper,
  GarageContainer,
  GarageError,
  StyledGarage,
} from './Garage.style';

function Garage() {
  const {
    totalPages,
    currentPage,
    selectedCar,
    isRaceStarted,
    isCarEngineStarted,
  } = useAppSelector((state) => state.garage);
  const { newWinner } = useAppSelector((state) => state.winners);
  const dispatch = useAppDispatch();
  const { data: cars, error } = useGetAllCarsQuery({
    page: currentPage,
    limit: limitCarsPerPage,
  });
  const [triggerGetCar] = useLazyGetCarQuery();
  const [removeCar] = useRemoveCarMutation();
  const [removeWinner] = useRemoveWinnerMutation();
  const carRef = useRef<(HTMLDivElement | null)[]>([]);
  const duration = useRef(0);
  const mapRef = useRef<Record<number, number>>({});

  useEffect(() => {
    if (cars?.totalCount) {
      dispatch(setTotalPages(getTotalCount(cars.totalCount, limitCarsPerPage)));
    }
  }, [cars?.totalCount]);

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

  const toggleDisableOptionButton = useCallback(
    (id: number) => isCarEngineStarted.includes(id),
    [isCarEngineStarted]
  );

  const selectCarOnClick = useCallback(
    async (car: CarData) => {
      const { data } = await triggerGetCar(car.id);

      if (data) {
        dispatch(setSelectedCar(data));
      }
    },
    [selectedCar]
  );

  const removeCarOnClick = useCallback(
    async (car: CarData) => {
      if (car.id === selectedCar?.id) {
        dispatch(setSelectedCar(null));
      }

      await removeCar(car);
      await removeWinner(car.id);
    },
    [selectedCar]
  );

  const startEngine = useCallback(
    async (car: CarData, index: number) => {
      const { velocity, distance } = await startOrStopEngine(
        StatusEngine.started,
        car.id
      );
      duration.current = getDuration(velocity, distance);
      dispatch(startCarEngine(car.id));
      const success = await startAnimation(
        car.id,
        index,
        duration.current,
        drive,
        mapRef.current
      );
      const result = {
        name: car.name,
        id: car.id,
        time: Number((duration.current / 1000).toFixed(2)),
      };
      return success ? result : Promise.reject();
    },
    [isCarEngineStarted]
  );

  const stopEngine = useCallback(
    async (car: CarData, index: number) => {
      await startOrStopEngine(StatusEngine.stopped, car.id);
      cancelAnimationFrame(mapRef.current[car.id]);
      reset(index);
      dispatch(stopCarEngine(car.id));
    },
    [isCarEngineStarted]
  );

  useEffect(() => {
    if (cars) {
      if (isRaceStarted) {
        Promise.any(
          cars.data.map((car, index) => startEngine(car, index))
        ).then((data) => dispatch(setNewWinner(data)));
        dispatch(setSelectedCar(null));
      } else {
        Promise.all(cars.data.map((car, index) => stopEngine(car, index)));
      }
    }
  }, [isRaceStarted]);

  useEffect(() => {
    if (currentPage !== 1 && !cars?.data.length) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  }, [cars?.data.length]);

  if (error && 'error' in error) {
    return (
      <GarageError>
        <Title>{`Error: ${error.error}`}</Title>
      </GarageError>
    );
  }

  return (
    <StyledGarage>
      <Title>{`Garage(${cars?.totalCount ?? 0})`}</Title>
      <GarageContainer>
        <TitlePage>{`Page #${currentPage}`}</TitlePage>
        {cars &&
          cars.data.map((item, index) => (
            <CarItem key={item.id}>
              <CarItemTop>
                <Button
                  text="Select"
                  disabled={toggleDisableOptionButton(item.id)}
                  callback={() => selectCarOnClick(item)}
                />
                <Button
                  text="Remove"
                  disabled={toggleDisableOptionButton(item.id)}
                  callback={() => removeCarOnClick(item)}
                />
                <CarItemTitle>{item.name}</CarItemTitle>
              </CarItemTop>
              <CarItemWrapper>
                <Button
                  text="S"
                  disabled={toggleDisableOptionButton(item.id)}
                  isStartButton
                  callback={() => startEngine(item, index)}
                />
                <Button
                  text="R"
                  disabled={!toggleDisableOptionButton(item.id)}
                  isStopButton
                  callback={() => stopEngine(item, index)}
                />
                <CarItemRoad>
                  <CarItemTrack>
                    <CarItemImg
                      ref={(el) => {
                        carRef.current[index] = el;
                      }}
                    >
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
          isPrevButtonDisabled={
            currentPage <= 1 || isCarEngineStarted.length > 0
          }
          isNextButtonDisabled={
            currentPage >= totalPages || isCarEngineStarted.length > 0
          }
          prevPageOnClick={() => dispatch(setCurrentPage(currentPage - 1))}
          nextPageOnClick={() => dispatch(setCurrentPage(currentPage + 1))}
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
