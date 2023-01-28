import { createReducer } from '@reduxjs/toolkit'
import { ICardState } from '../types'
import * as actions from '../actions'

const initialState: ICardState['data'] = {
  images: [],
  hiddenCards: [],
}

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.addImages, (state, action) => {
      state.images = action.payload
    })
    .addCase(actions.hideCard, (state, action) => {
      const card = { ...action.payload }
      const cardId = `${card.image}_${card.timestamp}`

      state.hiddenCards = [...state.hiddenCards, cardId]
    })
    .addCase(actions.clearHiddenArray, state => {
      state.hiddenCards = initialState.hiddenCards
    })

})
