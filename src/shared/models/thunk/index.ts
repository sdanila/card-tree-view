import { AppDispatch } from 'index'
import { Action } from 'redux'
import Api from 'services/api'
import { IApplicationState } from 'setup/store'

export type ThunkAction = {
  dispatch: AppDispatch
  getState: () => IApplicationState
  extra: {
    api: Api
  }
}
