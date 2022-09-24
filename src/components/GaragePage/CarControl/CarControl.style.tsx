import styled from 'styled-components';

const StyledCarControl = styled.div`
  display: flex;
`;

const CarControlTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  align-items: stretch;
  justify-content: center;
`;

const CarControlWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export {
  StyledCarControl,
  CarControlTop,
  CarControlWrapper,
};
