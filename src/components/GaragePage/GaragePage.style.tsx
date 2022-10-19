import styled from 'styled-components';

import { StyledActive } from 'ts/interfaces';

const StyledGaragePage = styled.div<StyledActive>`
  display: none;
  flex-direction: column;
  gap: 30px;

  ${({ active }) =>
    active &&
    `
    display: flex;
  `}
`;

export default StyledGaragePage;
