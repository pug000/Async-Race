import React, {
  useEffect,
  useState
} from 'react';

import BtnId from 'ts/enum';
import {
  Button,
  CarData
} from 'ts/interfaces';
import { SetState } from 'ts/types';

import CarSettings from './CarSettings/CarSettings';

import {
  CarControlTop,
  CarControlWrapper,
  CarControlWrapperButton,
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
  const [buttons, setButtons] = useState<Button[]>([
    { id: 1, text: 'Race', isDisabled: false },
    { id: 2, text: 'Reset', isDisabled: true },
    { id: 3, text: 'Generate Cars', isDisabled: false },
  ]);

  const toggleDisableBtn = () => setButtons((prev) => prev
    .map((button) => ({ ...button, isDisabled: !button.isDisabled })));

  const handleEvent = (currentBtn: Button) => {
    switch (currentBtn.id) {
      case BtnId.first:
        setRaceStarted(true);
        toggleDisableBtn();
        return currentBtn;
      case BtnId.second:
        setRaceStarted(false);
        toggleDisableBtn();
        return currentBtn;
      case BtnId.third:
        return getRandomCars();
      default:
        return currentBtn;
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
            <CarControlWrapperButton
              key={button.id}
              disabled={button.isDisabled}
              onClick={() => handleEvent(button)}
            >
              {button.text}
            </CarControlWrapperButton>
          ))}
        </CarControlWrapper>
      </CarControlTop>
    </StyledCarControl>
  );
}

export default CarControl;
