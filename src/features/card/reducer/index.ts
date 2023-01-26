import { combineReducers } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { ICardState } from '../types'
import communications from './communications'
import data from './data'

const persistConfig = {
  key: 'card',
  storage,
  version: 0,
  blacklist: ['communications'],
}

export const reducer = persistReducer(
  persistConfig,
  combineReducers<ICardState>({
    communications,
    data,
  })
)
