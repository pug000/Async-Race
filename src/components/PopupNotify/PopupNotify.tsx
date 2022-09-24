import React from 'react';
import {
  PopupNotifyContainer,
  PopupNotifyContainerTitle,
  StyledPopupNotify
} from './PopupNotify.style';

interface PopupNotifyPopup {
  title: string,
}

function PopupNotify({
  title,
}: PopupNotifyPopup) {
  return (
    <StyledPopupNotify>
      <PopupNotifyContainer>
        <PopupNotifyContainerTitle>{title}</PopupNotifyContainerTitle>
      </PopupNotifyContainer>
    </StyledPopupNotify>
  );
}

export default PopupNotify;
