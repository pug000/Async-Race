import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import Global from 'styles/Global';
import defaultTheme from 'styles/theme.style';

import App from 'App';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
