import React from 'react';
import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerContainerTitle}>Async Race</h1>
        <div className={styles.headerContainerWrapper}>
          <button className={styles.headerContainerWrapperBtn} type="button">Garage</button>
          <button className={styles.headerContainerWrapperBtn} type="button">Winners</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
