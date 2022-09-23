import React, {
  useEffect,
  useRef
} from 'react';

import { CarData } from 'ts/interfaces';
import { SetState } from 'ts/types';

import styles from './CarSettings.module.scss';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | null;
  isDisabled: boolean;
  isRaceStarted: boolean;
  setState: SetState<CarData> | SetState<CarData | null>;
}

function CarSettings(
  {
    text,
    itemCar,
    isDisabled,
    isRaceStarted,
    setState,
  }: CarSettingsProps,
) {
  const inputTextRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const handleEvent = () => {
    if (itemCar && inputTextRef.current?.value) {
      setState(
        {
          ...itemCar,
          name: inputTextRef.current ? inputTextRef.current.value : '',
          color: inputColorRef.current ? inputColorRef.current.value : '#ffffff',
        }
      );
    }
  };

  useEffect(() => {
    if (inputColorRef.current
      && inputTextRef.current) {
      inputTextRef.current.value = itemCar ? itemCar.name : '';
      inputColorRef.current.value = itemCar ? itemCar.color : '#ffffff';
    }
  }, [itemCar]);

  return (
    <div className={styles.settingsTopWrapper}>
      <input
        className={styles.settingsTopWrapperTextInput}
        type="text"
        ref={inputTextRef}
        disabled={!!isDisabled || isRaceStarted}
      />
      <input
        className={styles.settingsTopWrapperColorInput}
        type="color"
        ref={inputColorRef}
        disabled={!!isDisabled || isRaceStarted}
      />
      <button
        className={styles.settingsTopWrapperBtn}
        type="button"
        disabled={!!isDisabled || isRaceStarted}
        onClick={handleEvent}
      >
        {text}
      </button>
    </div>
  );
}

export default CarSettings;
