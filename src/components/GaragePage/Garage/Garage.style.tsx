import styled from 'styled-components';

import CarSvg from 'assets/icons/Car.svg';
import FinishFlag from 'assets/icons/FinishFlag.svg';

const StyledGarage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GarageError = styled.div`
  display: flex;
  justify-content: center;
`;

const GarageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CarItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const CarItemTop = styled.div`
  gap: 10px 10px;
  margin-bottom: 15px;
  display: flex;
`;

const CarItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ theme }) => theme.colors.whiteColor};
`;

const CarItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CarItemRoad = styled.div`
  border-bottom: 3px solid ${({ theme }) => theme.colors.whiteColor};
  display: flex;
  width: 100%;
  align-items: end;
`;

const CarItemTrack = styled.div`
  width: 100%;
`;

const CarItemImg = styled.div`
  max-width: 135px;
  position: relative;
`;

const CarIcon = styled(CarSvg)``;

const CarItemFinish = styled.div`
  max-width: 155px;
  width: 100%;
`;

const CarItemFinishSvg = styled(FinishFlag)`
  width: 40px;
  position: relative;
  transform: translateX(-85%);
  z-index: -1;
`;

const PopupNotify = styled.div`
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

export {
  StyledGarage,
  GarageError,
  GarageContainer,
  CarItem,
  CarItemTop,
  CarItemTitle,
  CarItemWrapper,
  CarItemTrack,
  CarItemRoad,
  CarItemImg,
  CarIcon,
  CarItemFinish,
  CarItemFinishSvg,
  PopupNotify,
  PopupNotifyContainer,
  PopupNotifyContainerTitle,
};
