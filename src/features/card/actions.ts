import { createAction } from '@reduxjs/toolkit'
import {
  makeCommunicationActionCreator
} from 'shared/utils/communication/actions/makeCommunicationActionCreator'
import dayjs from 'dayjs'
import { IImage } from 'shared/models/Images'

export const ADD_IMAGES = '@card/ADD_BET'
export const HIDE_CARD = '@card/HIDE_CARD'
export const CLEAR_HIDDEN_ARRAY = '@card/CLEAR_HIDDEN_ARRAY'

export const hideCard = createAction<IImage>(HIDE_CARD)
export const addImages = createAction<IImage[]>(ADD_IMAGES)
export const clearHiddenArray = createAction(CLEAR_HIDDEN_ARRAY)

export const getImages = makeCommunicationActionCreator({
  loading: '@card/GET_IMAGES_LOADING',
  success: '@card/GET_IMAGES_SUCCESS',
  error: '@card/GET_IMAGES_ERROR',
  reset: '@card/GET_IMAGES_RESET',
})<void, void>(
  async ({
    deps: {
      extra: { api },
      dispatch
    }
  }) => {

    try {
      await fetch('http://contest.elecard.ru/frontend_data/catalog.json')
        .then(data => data.json())
        .then(res => dispatch(addImages(res)))
    } catch (e) {
      console.log(e)
      dispatch(addImages([]))
    }
  },
)

export const resetHiddenCards = makeCommunicationActionCreator({
  loading: '@card/RESET_HIDDEN_IMAGES_LOADING',
  success: '@card/RESET_HIDDEN_IMAGES_SUCCESS',
  error: '@card/RESET_HIDDEN_IMAGES_ERROR',
  reset: '@card/RESET_HIDDEN_IMAGES_RESET',
})<void, void>(
  async ({
    deps: {
      dispatch
    }
  }) => {
    dispatch(getImages())
    dispatch(clearHiddenArray())
  },
)
