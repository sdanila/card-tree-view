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
