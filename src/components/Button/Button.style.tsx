import styled from 'styled-components';

interface StyledButtonProps {
  $isControlButton?: boolean,
  $isStartButton?: boolean,
  $isStopButton?: boolean,
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  padding: 5px 30px;
  border-radius: 7px;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ theme }) => theme.colors.transparentColor};

  &:hover {
    border-color: ${({ theme }) => theme.colors.lightGreenColor};
    color: ${({ theme }) => theme.colors.lightGreenColor};
  }

  ${({ $isControlButton }) => $isControlButton && `
    min-width: 115px;
    max-width: 125px;
    width: 100%;
  `}

  ${(props) => props.$isStartButton && `
    padding: 4px 10px;
    border-color: ${props.theme.colors.greenColor};
    color: ${props.theme.colors.greenColor};

    &:hover {
      border-color: ${props.theme.colors.greenColor};
      color: ${props.theme.colors.greenColor};
    }
  `}

  ${(props) => props.$isStopButton && `
    padding: 4px 10px;
    border-color: ${props.theme.colors.redColor};
    color: ${props.theme.colors.redColor};

    &:hover {
      border-color: ${props.theme.colors.redColor};
      color: ${props.theme.colors.redColor};
    }
  `}

  &:disabled {
    border-color: ${({ theme }) => theme.colors.brownColor};
    color: ${({ theme }) => theme.colors.brownColor};
  }
`;

export default StyledButton;
