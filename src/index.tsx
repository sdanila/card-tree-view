import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { configureStore, IApplicationState } from 'setup/store'

import App from './App';
import Api from './services/api'
import './index.css';

const api = new Api('')

const { store, persistor } = configureStore({ api })

const container = document.getElementById('root')!;
const root = createRoot(container);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);