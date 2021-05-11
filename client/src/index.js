import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <SnackbarProvider>
    <App />
  </SnackbarProvider>,
  document.getElementById('root')
);
registerServiceWorker();
