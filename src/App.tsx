import React from 'react';

import GaragePage from 'components/GaragePage/GaragePage';
import Header from 'components/Header/Header';
import WinnersPage from 'components/WinnersPage/WinnersPage';

function App() {
  return (
    <>
      <Header />
      <main className="main">
        <GaragePage />
        <WinnersPage />
      </main>
    </>
  );
}

export default App;
