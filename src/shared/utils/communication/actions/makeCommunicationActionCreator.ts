import { ThunkResult } from 'shared/types/redux'

import { AppError } from 'shared/models/AppError'
import { ICommunicationActionTypes } from './communicationActionTypes'
import { makeCommunicationActions } from './makeCommunicationActions'
import { CommunicateFunc } from '../shared'

export const makeCommunicationActionCreator =
  <L extends string, S extends string, E extends string, R extends string>(
    actionTypes: ICommunicationActionTypes<L, S, E, R>,
  ) =>
    <Payload, Data, ArgsPayload = {}>(communicate: CommunicateFunc<Payload, Data, ArgsPayload>) => {
      const actions = makeCommunicationActions<L, S, E, R, Data>(actionTypes)
      const actionCreator =
        // eslint-disable-next-line default-param-last
        (payload: Payload = {} as any, args?: ArgsPayload): ThunkResult<Promise<void>> =>
          async (dispatch, getState, extra) => {
            try {
              dispatch(actions.loading())
              const data = await communicate({
                payload,
                deps: {
                  dispatch,
                  getState,
                  extra,
                },
                args,
              })
              dispatch(actions.success(data))
            } catch (e) {
              let parsedError = e
              try {
                parsedError = JSON.parse(`${e}`?.match(/{(.*)}/)?.[0] || '')
              } catch (error) {
                dispatch(actions.error(parsedError as AppError))
                console.log(e)
                throw new Error(e as any)
              }

              dispatch(actions.error(parsedError as AppError))
            }
          }

      actionCreator.success = actions.success
      actionCreator.error = actions.error
      actionCreator.loading = actions.loading
      actionCreator.reset = actions.reset

      return actionCreator
    }
