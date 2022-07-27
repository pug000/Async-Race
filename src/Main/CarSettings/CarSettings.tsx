import React, { useState } from 'react';
import { OmitCarData } from '../../ts/types';
import styles from './CarSettings.module.scss';

interface CarSettingsProps {
  addOnClick: (item: OmitCarData<'id'>) => void;
}

function CarSettings(
  {
    addOnClick,
  }: CarSettingsProps,
) {
  const [item, setItem] = useState<OmitCarData<'id'>>({
    name: '',
    color: '#000000',
  });

  const handleEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    addOnClick(item);
    setItem({ ...item, name: '' });
  };

  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <div className={styles.settingsTopWrapper}>
          <input
            className={styles.settingsTopWrapperTextInput}
            type="text"
            value={item.name}
            onChange={({ target }) => setItem({ ...item, name: target.value })}
          />
          <input
            className={styles.settingsTopWrapperColorInput}
            type="color"
            onChange={({ target }) => setItem({ ...item, color: target.value })}
          />
          <button
            className={styles.settingsBtn}
            type="submit"
            onClick={handleEvent}
          >
            Create
          </button>
        </div>
        <div className={styles.settingsTopWrapper}>
          <input className={styles.settingsTopWrapperTextInput} type="text" />
          <input className={styles.settingsTopWrapperColorInput} type="color" />
          <button className={styles.settingsBtn} disabled type="button">Update</button>
        </div>
        <div className={styles.settingsBottom}>
          <button className={styles.settingsBtn} type="button">Race</button>
          <button className={styles.settingsBtn} type="button">Reset</button>
          <button className={styles.settingsBtn} type="button">Generate Car</button>
        </div>
      </div>
    </div>
  );
}

export default CarSettings;
