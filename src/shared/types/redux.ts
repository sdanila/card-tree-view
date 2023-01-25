import { Action, AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { IApplicationState } from 'setup/store'
import Api from 'services/api'

export interface IExtra {
  api: Api
}

export type ThunkResult<R = void, A extends Action = AnyAction> = ThunkAction<R, IApplicationState, IExtra, A>

export interface IThunkDeps {
  dispatch: ThunkDispatch<IApplicationState, IExtra, AnyAction>
  getState: () => IApplicationState
  extra: IExtra
}
