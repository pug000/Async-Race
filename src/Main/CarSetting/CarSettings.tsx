import React, { useEffect, useState } from 'react';
import { CarData } from '../../ts/interfaces';
import styles from './CarSetting.module.scss';

interface CarSettingsProps {
  text: string;
  itemCar: CarData | undefined;
  onSubmit: (item: CarData) => void;
  isDisabled: boolean;
}

function CarSetting(
  {
    text,
    itemCar,
    onSubmit,
    isDisabled,
  }: CarSettingsProps,
) {
  const defaultCar: CarData = {
    name: '',
    color: '#ffffff',
    id: 0,
  };

  const [tempItemCar, setTempItemCar] = useState<CarData>(defaultCar);

  useEffect(() => {
    if (itemCar) {
      setTempItemCar(itemCar);
    }
    setTempItemCar(defaultCar);
  }, [itemCar]);

  const handleEvent = () => {
    if (tempItemCar.name) {
      onSubmit(tempItemCar);
    }
  };

  return (
    <div className={styles.settingsTopWrapper}>
      <input
        className={styles.settingsTopWrapperTextInput}
        type="text"
        value={tempItemCar.name}
        disabled={!!isDisabled}
        onChange={({ target }) => setTempItemCar({ ...tempItemCar, name: target.value })}
      />
      <input
        className={styles.settingsTopWrapperColorInput}
        type="color"
        value={tempItemCar.color}
        disabled={!!isDisabled}
        onChange={({ target }) => setTempItemCar({ ...tempItemCar, color: target.value })}
      />
      <button
        className={styles.settingsTopWrapperBtn}
        type="button"
        disabled={!!isDisabled}
        onClick={handleEvent}
      >
        {text}
      </button>
    </div>
  );
}

export default CarSetting;
