import React from 'react';
import styles from './CarSettings.module.scss';

function CarSettings() {
  return (
    <div className={styles.settings}>
      <div className={styles.settingsTop}>
        <div className={styles.settingsTopWrapper}>
          <input className={styles.settingsTopWrapperTextInput} type="text" />
          <input className={styles.settingsTopWrapperColorInput} type="color" />
          <button className={styles.settingsBtn} type="button">Create</button>
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
