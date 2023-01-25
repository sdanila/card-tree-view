import { AnyAction } from 'redux'

import { initialCommunication } from 'shared/models/Communication/Communication'
import { ICommunicationById } from 'shared/models/Communication/CommunicationById'

import { ICommunicationByIdActions } from '../actions/makeCommucationByIdActions'
import { ICommunicationByIdPayload } from '../shared'

interface IIdGetters<LP, SP, EP, RP> {
  loading: (payload: LP) => string
  success: (payload: SP) => string
  error: (payload: EP) => string
  reset: (payload: RP) => string
}

const defaultIdGetters: IIdGetters<
  ICommunicationByIdPayload,
  ICommunicationByIdPayload,
  ICommunicationByIdPayload,
  ICommunicationByIdPayload
> = {
  success: ({ id }) => id,
  loading: ({ id }) => id,
  reset: ({ id }) => id,
  error: ({ id }) => id,
}

export const makeCommunicationByIdReducer = <
  L extends string,
  S extends string,
  E extends string,
  R extends string,
  LP,
  SP,
  EP,
  RP,
>(
  actions: ICommunicationByIdActions<L, S, E, R, LP, SP, EP, RP>,
  idGettersObj?: IIdGetters<LP, SP, EP, RP>,
) => {
  const idGetters = idGettersObj ?? defaultIdGetters
  // eslint-disable-next-line default-param-last
  return (state: ICommunicationById = {}, action: AnyAction): ICommunicationById => {
    switch (action.type) {
      case actions.loading.type:
        return {
          ...state,
          [idGetters.loading(action.payload)]: {
            isLoading: true,
            error: undefined,
            isSuccess: false,
          },
        }
      case actions.success.type:
        return {
          ...state,
          [idGetters.success(action.payload)]: {
            isLoading: false,
            error: undefined,
            isSuccess: true,
          },
        }
      case actions.error.type:
        return {
          ...state,
          [idGetters.error(action.payload)]: {
            isLoading: false,
            error: action.payload.error,
            isSuccess: false,
          },
        }
      case actions.reset.type:
        return {
          ...state,
          [idGetters.reset(action.payload)]: initialCommunication,
        }

      default:
        return state
    }
  }
}
