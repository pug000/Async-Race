import React from 'react';

import StyledButton from './Button.style';

interface ButtonProps {
  text: string;
  callback: () => void;
  disabled?: boolean;
  isControlButton?: boolean;
  isStartButton?: boolean;
  isStopButton?: boolean;
}

function Button({
  text,
  callback,
  disabled,
  isControlButton,
  isStartButton,
  isStopButton,
}: ButtonProps) {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      $isControlButton={isControlButton}
      $isStartButton={isStartButton}
      $isStopButton={isStopButton}
      onClick={callback}
    >
      {text}
    </StyledButton>
  );
}

Button.defaultProps = {
  disabled: false,
  isControlButton: false,
  isStartButton: false,
  isStopButton: false,
};

export default Button;
