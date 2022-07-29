import React from 'react';
import { CarData } from '../../ts/interfaces';
import { EventHandler } from '../../ts/types';
import styles from './CarSetting.module.scss';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | null;
  isDisabled: boolean;
  onChangeName: EventHandler<React.ChangeEvent<HTMLInputElement>, void>;
  onChangeColor: EventHandler<React.ChangeEvent<HTMLInputElement>, void>;
  onSubmit: (item: CarData) => void;
}

function CarSetting(
  {
    text,
    itemCar,
    isDisabled,
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
        disabled={!!isDisabled}
        value={itemCar ? itemCar.name : ''}
        onChange={onChangeName}
      />
      <input
        className={styles.settingsTopWrapperColorInput}
        type="color"
        disabled={!!isDisabled}
        value={itemCar ? itemCar.color : '#ffffff'}
        onChange={onChangeColor}
      />
      <button
        className={styles.settingsTopWrapperBtn}
        type="button"
        disabled={!!isDisabled}
        onClick={() => (itemCar ? handleEvent(itemCar) : null)}
      >
        {text}
      </button>
    </div>
  );
}

export default CarSetting;
