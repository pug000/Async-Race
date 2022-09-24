import styled from 'styled-components';

import { StyledActive } from 'ts/interfaces';

import CarSvg from 'assets/icons/Car.svg';

interface StyledClickable {
  $isClickable?: boolean,
}

interface StyledSortState {
  $isASC?: boolean,
  $isDESC?: boolean
}

const Winners = styled.div<StyledActive>`
  display: none;
  flex-direction: column;
  gap: 30px;

  ${({ active }) => !active && `
    display: flex;
  `}
`;

const CarIcon = styled(CarSvg)`
  max-width: 110px;
  width: 100%;
`;

const WinnersTable = styled.table`
  display: flow-root;
  align-items: center;
  color: ${({ theme }) => theme.colors.whiteColor};
`;

const WinnersTableHead = styled.thead`
  border: 2px solid ${({ theme }) => theme.colors.whiteColor};
  border-radius: 5px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  vertical-align: middle;
  text-align: left;
  user-select: none;
`;

const WinnersTr = styled.tr``;

const WinnersTh = styled.th<StyledClickable>`
  border: 2px solid ${({ theme }) => theme.colors.whiteColor};
  border-radius: 5px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.h3};
  vertical-align: middle;
  text-align: left;

  ${({ $isClickable }) => $isClickable && `
    cursor: pointer;
  `}
`;

const WinnersText = styled.span<StyledSortState>`
  margin-left: 5px;

  &::before {
    content: "";
    ${({ $isDESC }) => $isDESC && 'content: "↑"'}
    ${({ $isASC }) => $isASC && 'content: "↓"'}
  }
`;

const WinnersTableBody = styled.tbody``;

export {
  Winners,
  WinnersTable,
  WinnersTableHead,
  WinnersTableBody,
  WinnersTh,
  WinnersTr,
  CarIcon,
  WinnersText,
};
