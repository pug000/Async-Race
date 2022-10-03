import React, { useEffect, useRef } from 'react';

import Button from 'components/Button/Button';

import { CarData } from 'ts/interfaces';
import { SetState } from 'ts/types';

import { CarSettingsInput, StyledCarSettings } from './CarSettings.style';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | null;
  isDisabled: boolean;
  isRaceStarted: boolean;
  setState: SetState<CarData> | SetState<CarData | null>;
}

function CarSettings({
  text,
  itemCar,
  isDisabled,
  isRaceStarted,
  setState,
}: CarSettingsProps) {
  const inputTextRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const handleEvent = () => {
    if (itemCar && inputTextRef.current?.value) {
      setState({
        ...itemCar,
        name: inputTextRef.current ? inputTextRef.current.value : '',
        color: inputColorRef.current ? inputColorRef.current.value : '#ffffff',
      });
    }
  };

  useEffect(() => {
    if (inputColorRef.current && inputTextRef.current) {
      inputTextRef.current.value = itemCar ? itemCar.name : '';
      inputColorRef.current.value = itemCar ? itemCar.color : '#ffffff';
    }
  }, [itemCar]);

  return (
    <StyledCarSettings>
      <CarSettingsInput
        $type="text"
        ref={inputTextRef}
        disabled={!!isDisabled || isRaceStarted}
      />
      <CarSettingsInput
        $type="color"
        ref={inputColorRef}
        disabled={!!isDisabled || isRaceStarted}
      />
      <Button text={text} callback={handleEvent} isControlButton />
    </StyledCarSettings>
  );
}

export default CarSettings;
