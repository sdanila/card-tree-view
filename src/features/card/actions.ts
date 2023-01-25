import {
  makeCommunicationActionCreator
} from 'shared/utils/communication/actions/makeCommunicationActionCreator'
import dayjs from 'dayjs'


export const getImages = makeCommunicationActionCreator({
  loading: '@card/GET_IMAGES_LOADING',
  success: '@card/GET_IMAGES_SUCCESS',
  error: '@card/GET_IMAGES_ERROR',
  reset: '@card/GET_IMAGES_RESET',
})<any, any>(
  async ({
    deps: {
      extra: { api },
    }
  }) => {

    const response = await api.image.getImage()
    return response.data
  },
)
