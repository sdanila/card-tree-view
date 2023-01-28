import { combineReducers } from 'redux'

import { makeCommunicationReducer } from 'shared/utils/communication/reducer/makeCommunicationReducer'
import { ICardState } from '../types'

import * as actions from '../actions'

export default combineReducers<ICardState['communications']>({
  getImages: makeCommunicationReducer(actions.getImages),
  resetCards: makeCommunicationReducer(actions.resetHiddenCards),
})
