import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { ICommunicationActionTypes } from './communicationActionTypes'

export interface ICommunicationByIdActions<
  L extends string,
  S extends string,
  E extends string,
  R extends string,
  LP,
  SP,
  EP,
  RP,
> {
  loading: ActionCreatorWithPayload<LP, L>
  success: ActionCreatorWithPayload<SP, S>
  error: ActionCreatorWithPayload<EP, E>
  reset: ActionCreatorWithPayload<RP, R>
}

export const makeCommunicationByIdActions = <
  L extends string,
  S extends string,
  E extends string,
  R extends string,
  LP,
  SP,
  EP,
  RP,
>(
  actionTypes: ICommunicationActionTypes<L, S, E, R>,
): ICommunicationByIdActions<L, S, E, R, LP, SP, EP, RP> => {
  const loading = createAction<LP>(actionTypes.loading)
  const success = createAction<SP>(actionTypes.success)
  const error = createAction<EP>(actionTypes.error)
  const reset = createAction<RP>(actionTypes.reset)

  return {
    success,
    loading,
    error,
    reset,
  } as ICommunicationByIdActions<L, S, E, R, LP, SP, EP, RP>
}
