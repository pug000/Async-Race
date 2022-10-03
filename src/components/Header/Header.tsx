import React from 'react';

import Button from 'components/Button/Button';

import {
  HeaderContainer,
  HeaderTitle,
  HeaderWrapper,
  StyledHeader,
} from './Header.style';

interface HeaderProps {
  switchPages: (pageState: boolean) => void;
}

function Header({ switchPages }: HeaderProps) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <HeaderTitle>Async Race</HeaderTitle>
        <HeaderWrapper>
          <Button text="Garage" callback={() => switchPages(true)} />
          <Button text="Winners" callback={() => switchPages(false)} />
        </HeaderWrapper>
      </HeaderContainer>
    </StyledHeader>
  );
}

export default Header;
