import { EmptyObject } from 'redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { ICommunication } from 'shared/models/Communication/Communication'
import { IImage } from 'shared/models/Images'

export interface ICardState {
  communications: {
    getImages: ICommunication
  }
  data: {
    images: IImage[] | []
  }
}

export type ICardStatePersisted = ICardState & EmptyObject & PersistPartial