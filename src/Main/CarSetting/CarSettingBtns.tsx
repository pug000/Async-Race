import React, { useState } from 'react';
import { generateRandomCars } from '../../logic';
import BtnId from '../../ts/enum';
import { Button } from '../../ts/interfaces';
import { OmitCarDataId } from '../../ts/types';
import styles from './CarSetting.module.scss';

interface CarSettingsProps {
  generateOnClick: (item: OmitCarDataId) => void;
}

function CarSettingBtns(
  {
    generateOnClick,
  }: CarSettingsProps,
) {
  const [btns] = useState([
    { id: 1, text: 'Race' },
    { id: 2, text: 'Reset' },
    { id: 3, text: 'Generate Cars' },
  ]);

  const random = async () => {
    const cars: OmitCarDataId[] = generateRandomCars();
    Promise.all(cars.map((car) => generateOnClick(car)));
  };

  const handleEvent = (currentBtn: Button) => {
    switch (currentBtn.id) {
      case BtnId.third:
        return random();
      default:
        return currentBtn;
    }
  };

  return (
    <div className={styles.settingsBottom}>
      {btns.map((btn) => (
        <button
          className={styles.settingsBottomBtn}
          key={btn.id}
          type="button"
          onClick={() => handleEvent(btn)}
        >
          {btn.text}
        </button>
      ))}
    </div>
  );
}

export default CarSettingBtns;
