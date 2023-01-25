import { createReducer } from '@reduxjs/toolkit'
import { ICardState } from '../types'
import * as actions from '../actions'

const initialState: ICardState['data'] = {
  images: [],
}

export default createReducer(initialState, builder => {
  builder
    .addCase(actions.getImages.success, (state, action) => {
      state.images = action.payload
    })

})
