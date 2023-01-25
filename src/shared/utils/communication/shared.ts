import { AppError } from 'shared/models/AppError'
import { IThunkDeps } from 'shared/types/redux'

export interface ICommunicateFuncArgs<RequestPayload, ArgsPayload> {
  payload: RequestPayload
  deps: IThunkDeps
  args?: ArgsPayload
}

export type CommunicateFunc<RequestPayload, SuccessPayload, ArgsPayload = {}> = (
  args: ICommunicateFuncArgs<RequestPayload, ArgsPayload>,
) => Promise<SuccessPayload>

export interface ICommunicationByIdPayload {
  id: string
}

export type ICommunicationByIdSuccessPayload<Data> = Data & ICommunicationByIdPayload

export interface ICommunicationByIdErrorPayload extends ICommunicationByIdPayload {
  error: AppError
}
