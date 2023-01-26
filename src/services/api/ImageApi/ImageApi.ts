
import { BaseHttpService } from '../BaseHttpService'
import { QueryTypes } from '../data'

class ImageApi extends BaseHttpService {

  constructor(baseUrl: string) {
    super(baseUrl)
    this.baseUrl = `${baseUrl}`
  }

  async getImage() {
    return this.sendQuery({
      url: `http://contest.elecard.ru/frontend_data/catalog.json/`,
      type: QueryTypes.GET,
    })
  }
}

export default ImageApi
