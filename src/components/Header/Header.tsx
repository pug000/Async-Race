import React from 'react';
import {
  HeaderContainer,
  HeaderTitle,
  HeaderWrapper,
  HeaderWrapperButton,
  StyledHeader
} from './Header.style';

interface HeaderProps {
  switchPages: (bool: boolean) => void;
}

function Header(
  {
    switchPages,
  }: HeaderProps,
) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderTitle>Async Race</HeaderTitle>
        <HeaderWrapper>
          <HeaderWrapperButton
            onClick={() => switchPages(true)}
          >
            Garage
          </HeaderWrapperButton>
          <HeaderWrapperButton
            onClick={() => switchPages(false)}
          >
            Winners
          </HeaderWrapperButton>
        </HeaderWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
