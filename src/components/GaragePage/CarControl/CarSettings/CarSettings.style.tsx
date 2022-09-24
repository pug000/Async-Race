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

export {
  StyledCarSettings,
  CarSettingsInput
};
