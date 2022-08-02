import React, { useState } from 'react';
import Main from '@/Main';
import Header from '@/Header';

import './styles/reset.scss';

function App() {
  const [isGaragePage, setGaragePage] = useState<boolean>(true);

  const switchPages = (bool: boolean) => setGaragePage(bool);

  return (
    <>
      <Header switchPages={switchPages} />
      <Main isGaragePage={isGaragePage} />
    </>
  );
}

export default App;
