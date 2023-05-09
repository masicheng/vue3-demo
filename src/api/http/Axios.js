import axios from "axios"
import { cloneDeep, isFunction } from "lodash"
import { AxiosCanceler } from "./AxiosCancel"
import defaultConfig from "./defaultConfig"

// axios.defaults = defaultConfig
export class Axios {
  constructor(options) {
    this.options = options
    this.axiosInstance = axios.create(this.options)
    this._initRequestMethod()
  }
  _initRequestMethod() {
    ;["GET", "POST", "PUT", "DELETE"].forEach((method) => {
      this.axiosInstance[method.toLocaleLowerCase()] = (config, options) =>
        this.request({ ...config, method }, options)
    })
  }
//   //设置拦截器
//   _setupIntercepters() {}

  request(requestConfig, options) {
    let config = cloneDeep(requestConfig)
    if (config.cancelToken) {
      config.cancelToken = requestConfig.cancelToken
    }
    const { requestOptions, transform } = this.options
    const { beforeRequestHook, requestCatchHook, transformResponseHook } =
      transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    const opt = Object.assign({}, requestOptions, options)
    config.requestOptions = opt
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error("request error!"))
            }
            return
          }
          resolve(res)
        })
        .catch((e) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
}
