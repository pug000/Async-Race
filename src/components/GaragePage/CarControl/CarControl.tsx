import React, {
  useEffect,
  useState
} from 'react';

import Button from 'components/Button/Button';

import { controlButtons } from 'utils';

import ButtonId from 'ts/enum';
import {
  ButtonState,
  CarData
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import CarSettings from './CarSettings/CarSettings';

import {
  CarControlTop,
  CarControlWrapper,
  StyledCarControl
} from './CarControl.style';

interface CarControlProps {
  newCar: CarData;
  selectedCar: CarData | null;
  isRaceStarted: boolean;
  setRaceStarted: SetState<boolean>;
  setNewCar: SetState<CarData>;
  getRandomCars: () => void;
  setUpdatedCar: SetState<CarData | null>;
}

function CarControl(
  {
    newCar,
    selectedCar,
    isRaceStarted,
    setRaceStarted,
    setNewCar,
    setUpdatedCar,
    getRandomCars,
  }: CarControlProps,
) {
  const [isDisabled, setDisabled] = useState<boolean>(true);
  const [buttons, setButtons] = useState<ButtonState[]>(controlButtons);

  const toggleDisableBtn = () => setButtons((prev) => prev
    .map((button) => ({ ...button, isDisabled: !button.isDisabled })));

  const handleEvent = (currentButton: ButtonState) => {
    switch (currentButton.id) {
      case ButtonId.first:
        setRaceStarted(true);
        toggleDisableBtn();
        return currentButton;
      case ButtonId.second:
        setRaceStarted(false);
        toggleDisableBtn();
        return currentButton;
      case ButtonId.third:
        return getRandomCars();
      default:
        return currentButton;
    }
  };

  useEffect(() => {
    if (selectedCar) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selectedCar]);

  return (
    <StyledCarControl>
      <CarControlTop>
        <CarSettings
          text="Create"
          itemCar={newCar}
          isDisabled={false}
          setState={setNewCar}
          isRaceStarted={isRaceStarted}
        />
        <CarSettings
          text="Update"
          itemCar={selectedCar}
          isDisabled={isDisabled}
          setState={setUpdatedCar}
          isRaceStarted={isRaceStarted}
        />
        <CarControlWrapper>
          {buttons.map((button) => (
            <Button
              key={button.id}
              text={button.text}
              disabled={button.isDisabled}
              callback={() => handleEvent(button)}
            />
          ))}
        </CarControlWrapper>
      </CarControlTop>
    </StyledCarControl>
  );
}

export default CarControl;
