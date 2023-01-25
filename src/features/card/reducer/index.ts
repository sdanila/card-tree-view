import { combineReducers } from 'redux'
import { ICardState } from '../types'
import communications from './communications'
import data from './data'

export const reducer = combineReducers<ICardState>({
  communications,
  data,
})
