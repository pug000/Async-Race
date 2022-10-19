import styled from 'styled-components';

const StyledPopupNotify = styled.div`
  display: flex;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
`;

const PopupNotifyContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PopupNotifyContainerTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.greenColor};
  border-radius: 5px;
`;

export { StyledPopupNotify, PopupNotifyContainer, PopupNotifyContainerTitle };
