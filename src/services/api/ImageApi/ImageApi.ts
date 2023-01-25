
import { BaseHttpService } from '../BaseHttpService'
import { QueryTypes } from '../data'

class ImageApi extends BaseHttpService {

  constructor(baseUrl: string) {
    super(baseUrl)
    this.baseUrl = `${baseUrl}/frontend_data`
  }

  async getImage() {
    return this.sendQuery({
      url: `${this.baseUrl}/catalog.json/`,
      type: QueryTypes.GET,
    })
  }
}

export default ImageApi
