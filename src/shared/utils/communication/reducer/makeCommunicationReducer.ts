import { AnyAction } from 'redux'

import { ICommunication, initialCommunication } from 'shared/models/Communication/Communication'

import { ICommunicationActions } from '../actions/makeCommunicationActions'

export const makeCommunicationReducer =
  <L extends string, S extends string, E extends string, R extends string, Data>(
    actions: ICommunicationActions<L, S, E, R, Data>,
  ) =>
    // eslint-disable-next-line default-param-last
    (state: ICommunication = initialCommunication, action: AnyAction): ICommunication => {
      switch (action.type) {
        case actions.loading().type:
          return {
            isLoading: true,
            error: undefined,
            isSuccess: false,
          }
        case actions.success.type:
          return {
            isLoading: false,
            isSuccess: true,
            error: undefined,
          }
        case actions.error().type:
          return {
            isLoading: false,
            isSuccess: false,
            error: action.payload,
          }
        case actions.reset().type:
          return initialCommunication
        default:
          return state
      }
    }
