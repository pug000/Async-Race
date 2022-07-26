import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/styles.scss';

const root = document.getElementById('root');

if (!root) throw new Error();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);