import styled from 'styled-components';

import { InputType } from 'ts/interfaces';

const StyledCarSettings = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
`;

const CarSettingsInput = styled.input.attrs<InputType>(({ $type }) => ({
  type: $type
})) <InputType>`
  height: 30px;
  min-width: 50px;

  ${({ $type }) => (
    $type === 'text' && `
    border: none;
    padding: 4px 0 4px 12px;
    border-radius: 4px;
    width: 100%;
    font-size: 16px;

    &:focus {
      outline: none;
    }
    `
  )}
`;

const CarSettingsButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  padding: 4px 45px;
  border-radius: 7px;
  font-size: 17px;
  transition: ${({ theme }) => theme.effects.transition};
  min-width: 115px;
  max-width: 125px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.transparentColor};

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
  StyledCarSettings,
  CarSettingsButton,
  CarSettingsInput
};
