import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { configureStore } from 'setup/store'

import App from './App';
import Api from './services/api'

import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'

const api = new Api('')

const { store } = configureStore({ api })

const container = document.getElementById('root')!;
const root = createRoot(container);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);