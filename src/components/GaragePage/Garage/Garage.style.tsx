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

const CarItemTopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.colors.whiteColor};
  cursor: pointer;
  padding: 4px 25px;
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

const CarItemTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  color: ${({ theme }) => theme.colors.whiteColor};
`;

const CarItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CarItemWrapperButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 7px;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ theme }) => theme.colors.transparentColor};

  &:nth-child(1) {
    border-color: ${({ theme }) => theme.colors.greenColor};
    color: ${({ theme }) => theme.colors.greenColor};
  }

  &:nth-child(2) {
    border-color: ${({ theme }) => theme.colors.redColor};
    color: ${({ theme }) => theme.colors.redColor};
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.brownColor};
    color: ${({ theme }) => theme.colors.brownColor};
  }
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
  CarItemTopButton,
  CarItemTitle,
  CarItemWrapper,
  CarItemWrapperButton,
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
