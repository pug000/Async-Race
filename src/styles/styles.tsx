import styled from 'styled-components';

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
`;

const TitlePage = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  line-height: 20px;
  margin-bottom: 15px;
`;

export { Title, TitlePage };
