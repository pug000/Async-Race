import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 50px 0 50px;
  height: 70px;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.colors.whiteColor};
`;

const HeaderWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export { StyledHeader, HeaderTitle, HeaderContainer, HeaderWrapper };
