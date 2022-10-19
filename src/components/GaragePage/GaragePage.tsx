import React from 'react';

import { useAppSelector } from 'hooks/useRedux';

import CarControl from './CarControl/CarControl';
import Garage from './Garage/Garage';
import StyledGaragePage from './GaragePage.style';

function GaragePage() {
  const { isGaragePage } = useAppSelector((state) => state.garage);

  return (
    <StyledGaragePage active={isGaragePage}>
      <CarControl />
      <Garage />
    </StyledGaragePage>
  );
}

export default GaragePage;
