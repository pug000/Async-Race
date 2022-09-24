import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  gap: 30px;
`;

const PaginationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  padding: 4px 45px;
  border-radius: 7px;
  transition: ${({ theme }) => theme.effects.transition};
  height: 30px;
  background-color: ${({ theme }) => theme.colors.transparentColor};
  color: ${({ theme }) => theme.colors.whiteColor};

  &:hover {
    border-color: ${({ theme }) => theme.colors.lightGreenColor};
    color: ${({ theme }) => theme.colors.lightGreenColor};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.brownColor};
    color: ${({ theme }) => theme.colors.brownColor};
  }
`;

export {
  StyledPagination,
  PaginationButton,
};
