import { ActionCreatorWithoutPayload, createAction, PayloadActionCreator } from '@reduxjs/toolkit'

import { AppError } from 'shared/models/AppError'

import { ICommunicationActionTypes } from './communicationActionTypes'
export interface ICommunicationActions<L extends string, S extends string, E extends string, R extends string, Data> {
  loading: ActionCreatorWithoutPayload<L>
  success: PayloadActionCreator<Data, S>
  error: any
  reset: any
}

export const makeCommunicationActions = <L extends string, S extends string, E extends string, R extends string, Data>(
  actionTypes: ICommunicationActionTypes<L, S, E, R>,
): ICommunicationActions<L, S, E, R, Data> => {
  const loading = createAction(actionTypes.loading)
  const success = createAction<Data, S>(actionTypes.success)
  const error = createAction<AppError>(actionTypes.error)
  const reset = createAction(actionTypes.reset)

  return {
    success,
    loading,
    error,
    reset,
  }
}
