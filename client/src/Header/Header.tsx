import React, { FC } from 'react';
import styles from './Header.module.scss';

const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.headerContainer}>
      <h1 className={styles.headerContainerTitle}>Async Race</h1>
      <div className={styles.headerContainerWrapper}>
        <button className={styles.headerContainerWrapperBtn}>Garage</button>
        <button className={styles.headerContainerWrapperBtn}>Winners</button>
      </div>
    </div>
  </header>
);

export default Header;
