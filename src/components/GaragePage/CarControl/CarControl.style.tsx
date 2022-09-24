import styled from 'styled-components';

const StyledCarControl = styled.div`
  display: flex;
`;

const CarControlTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  align-items: stretch;
  justify-content: center;
`;

const CarControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CarControlWrapperButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  padding: 5px 15px;
  border-radius: 7px;
  transition: ${({ theme }) => theme.effects.transition};
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
  StyledCarControl,
  CarControlTop,
  CarControlWrapper,
  CarControlWrapperButton,
};
