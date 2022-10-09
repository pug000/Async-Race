import React, { useEffect, useRef } from 'react';

import Button from 'components/Button/Button';

import { CarData } from 'ts/interfaces';

import { CarSettingsInput, StyledCarSettings } from './CarSettings.style';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | null;
  isDisabledSettings: boolean;
  isRaceStarted: boolean;
  callback: (car: CarData) => Promise<void>;
}

function CarSettings({
  text,
  itemCar,
  isDisabledSettings,
  isRaceStarted,
  callback,
}: CarSettingsProps) {
  const inputTextRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const setCarOnClick = () => {
    if (
      itemCar &&
      inputTextRef.current?.value &&
      inputColorRef.current?.value
    ) {
      callback({
        ...itemCar,
        name: inputTextRef.current.value ?? '',
        color: inputColorRef.current.value ?? '#ffffff',
      });
      inputTextRef.current.value = '';
      inputColorRef.current.value = '#ffffff';
    }
  };

  useEffect(() => {
    if (inputColorRef.current && inputTextRef.current) {
      inputTextRef.current.value = itemCar?.name ?? '';
      inputColorRef.current.value = itemCar?.color ?? '#ffffff';
    }
  }, [itemCar]);

  return (
    <StyledCarSettings>
      <CarSettingsInput
        $type="text"
        ref={inputTextRef}
        disabled={isDisabledSettings || isRaceStarted}
      />
      <CarSettingsInput
        $type="color"
        ref={inputColorRef}
        disabled={isDisabledSettings || isRaceStarted}
      />
      <Button
        text={text}
        callback={setCarOnClick}
        isControlButton
        disabled={isDisabledSettings || isRaceStarted}
      />
    </StyledCarSettings>
  );
}

export default CarSettings;
