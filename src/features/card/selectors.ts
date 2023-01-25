import { IApplicationState } from 'setup/store'

export const selectCardData = (state: IApplicationState) => state.card.data
export const selectCardComm = (state: IApplicationState) => state.card.communications

export const selectCardImages = (state: IApplicationState) => state.card.data.images
