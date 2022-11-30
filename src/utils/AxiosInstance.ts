import axios, { AxiosRequestConfig } from 'axios'
import { cancelToken } from './cancelToken'

const defaultConfig = {
  timeOut: 50000,
  baseURL: import.meta.env.VITE_BASE_URL ? import.meta.env.VITE_BASE_URL : 'http://110.42.184.111'
}

class Http {
  // 建構子 // 建構私有成員方法
  constructor() {
    this.httpInterceptorRequest()
    this.httpInterceptorResponse()
  }

  // 私有成員，不公開暴露
  // Axios實例
  private static axiosInstance = axios.create(defaultConfig)

  // 請求攔截
  private httpInterceptorRequest() {
    Http.axiosInstance.interceptors.request.use((config) => {
      cancelToken.removeRequestPending(config)

      const abortInstance = new AbortController()

      config.signal = abortInstance.signal

      const requestItem = {
        uuid: `${config.url}&${config.method}`,
        cancel: abortInstance
      }
      cancelToken.addRequestPending(requestItem)

      return config
    }, err => {
      return Promise.reject(err)
    })
  }
  // 回應攔截
  private httpInterceptorResponse() {
    Http.axiosInstance.interceptors.response.use((res) => {
      cancelToken.clearRequestPending(res.config)

      return res
    }, err => {
      return Promise.reject(err)
    })
  }

  // 公有成員
  // 封裝請求 // 回傳資料為 Promise 使用泛型
  public httpRequestGet <T>(url : string, params : AxiosRequestConfig) : Promise<T> {
    return Http.axiosInstance.get(url, params).then((res) => res.data).catch()
  }

  public httpRequestPost <T>(url : string, params : AxiosRequestConfig) : Promise<T> {
    return Http.axiosInstance.post(url, params).then((res) => res.data).catch()
  }

}

// 暴露實例出去
export const http = new Http()