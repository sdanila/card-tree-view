/* eslint-disable max-classes-per-file */
import axios, { AxiosRequestConfig } from 'axios'
import { QueryTypes } from './data'

export interface IHttpMethodRequestSettings<SR, CR, D> {
  url: string
  type: typeof QueryTypes[keyof typeof QueryTypes]
  data?: D
  options?: AxiosRequestConfig<D>
  // eslint-disable-next-line no-unused-vars
  converterSuccess?: (data: SR) => CR
  // eslint-disable-next-line no-unused-vars
  converterFailed?: (data: unknown) => unknown
}

interface IHttpResponse<CR> {
  success: boolean
  data: CR
  errorMessage: string
  codeStatus: string
}

export class BaseHttpService {

  constructor(public baseUrl: string) {
    axios.defaults.responseType = 'json'
    axios.defaults.timeout = 30000
    axios.defaults.validateStatus = status => (status >= 200 && status < 300) || status === 302

    this.baseUrl = baseUrl
  }

  protected sendQuery = async <ServerResponse, ConverteredResponse, Data extends AxiosRequestConfig<any>>({
    url,
    data,
    type,
    options,
    converterSuccess,
  }:
    IHttpMethodRequestSettings<ServerResponse, ConverteredResponse, Data>): Promise<
      IHttpResponse<ConverteredResponse>
    > => {
    let response
    switch (type) {
      case QueryTypes.POST:
        response = await axios.post(url, data, options)
        break
      case QueryTypes.DELETE:
        response = await axios.delete(url, data)
        break
      case QueryTypes.PUT:
        response = await axios.put(url, data, options)
        break
      case QueryTypes.PATCH:
        response = await axios.patch(url, data, options)
        break
      default:
        response = await axios.get(url, data)
        break
    }

    const { data: responseData, status } = response
    const success = status >= 200 && status <= 300
    const resultResponse = {
      success,
      data: success && converterSuccess ? converterSuccess(responseData as ServerResponse) : responseData,
      errorMessage: responseData.message,
      codeStatus: responseData.code || status,
      responseStatus: status,
    }
    return resultResponse
  }
}
