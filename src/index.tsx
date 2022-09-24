import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from 'App';

import Global from 'styles/Global';
import defaultTheme from 'styles/theme.style';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <Global />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
