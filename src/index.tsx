import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from 'redux/store';

import Global from 'styles/Global';
import defaultTheme from 'styles/theme.style';

import App from 'App';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <Global />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
