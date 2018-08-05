import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/store';
import rootSaga from './app/sagas';
import App from './app/app';
import registerServiceWorker from './registerServiceWorker';
import '../src/app/styles/css/index.css';

const store = configureStore();

store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
