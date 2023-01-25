import ImageApi from './ImageApi/ImageApi'

class Api {
  public image: ImageApi

  constructor(baseUrl = '') {
    this.image = new ImageApi(baseUrl)
  }
}

export default Api
