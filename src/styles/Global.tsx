import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 400;
}

body {
  background-color: ${({ theme }) => theme.colors.purpleColor};
}

#root {
  padding-bottom: 30px;
  font-family: ${({ theme }) => theme.fonts.text};
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.whiteColor};
}

button {
  font-size: ${({ theme }) => theme.fontSizes.text};
  color: ${({ theme }) => theme.colors.whiteColor};
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

.main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.garage {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
`;

export default Global;
