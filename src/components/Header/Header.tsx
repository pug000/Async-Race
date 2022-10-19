import React, { useCallback } from 'react';

import { setGaragePage } from 'redux/slices/garageSlice';

import Button from 'components/Button/Button';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';

import {
  HeaderContainer,
  HeaderTitle,
  HeaderWrapper,
  StyledHeader,
} from './Header.style';

function Header() {
  const { isGaragePage } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();

  const togglePages = useCallback(
    (value: boolean) => dispatch(setGaragePage(value)),
    [isGaragePage]
  );

  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderTitle>Async Race</HeaderTitle>
        <HeaderWrapper>
          <Button text="Garage" callback={() => togglePages(true)} />
          <Button text="Winners" callback={() => togglePages(false)} />
        </HeaderWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
