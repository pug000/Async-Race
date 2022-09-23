import React from 'react';

import styles from './Header.module.scss';

interface HeaderProps {
  switchPages: (bool: boolean) => void;
}

function Header(
  {
    switchPages,
  }: HeaderProps,
) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerContainerTitle}>Async Race</h1>
        <div className={styles.headerContainerWrapper}>
          <button
            className={styles.headerContainerWrapperBtn}
            type="button"
            onClick={() => switchPages(true)}
          >
            Garage
          </button>
          <button
            className={styles.headerContainerWrapperBtn}
            type="button"
            onClick={() => switchPages(false)}
          >
            Winners
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;