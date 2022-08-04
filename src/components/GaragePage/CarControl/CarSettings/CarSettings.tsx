import React from 'react';
import { CarData } from '@/ts/interfaces';
import { EventHandler } from '@/ts/types';
import styles from './CarSettings.module.scss';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | null;
  isDisabled: boolean;
  isRaceStarted: boolean;
  onChangeName: EventHandler<React.ChangeEvent<HTMLInputElement>, void>;
  onChangeColor: EventHandler<React.ChangeEvent<HTMLInputElement>, void>;
  onSubmit: (item: CarData) => void;
}

function CarSettings(
  {
    text,
    itemCar,
    isDisabled,
    isRaceStarted,
    onChangeName,
    onChangeColor,
    onSubmit,
  }: CarSettingsProps,
) {
  const handleEvent = (item: CarData) => (item.name ? onSubmit(item) : '');
  return (
    <div className={styles.settingsTopWrapper}>
      <input
        className={styles.settingsTopWrapperTextInput}
        type="text"
        disabled={!!isDisabled || isRaceStarted}
        value={itemCar ? itemCar.name : ''}
        onChange={onChangeName}
      />
      <input
        className={styles.settingsTopWrapperColorInput}
        type="color"
        disabled={!!isDisabled || isRaceStarted}
        value={itemCar ? itemCar.color : '#ffffff'}
        onChange={onChangeColor}
      />
      <button
        className={styles.settingsTopWrapperBtn}
        type="button"
        disabled={!!isDisabled || isRaceStarted}
        onClick={() => (itemCar ? handleEvent(itemCar) : null)}
      >
        {text}
      </button>
    </div>
  );
}

export default CarSettings;
