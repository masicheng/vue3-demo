import axios from "axios"
import { cloneDeep, isFunction } from "lodash"
import { AxiosCanceler } from "./AxiosCancel"
// import defaultConfig from "./defaultConfig"

// axios.defaults = defaultConfig
export class Axios {
  constructor(options) {
    this.options = options
    this.axiosInstance = axios.create(this.options)
    this._initRequestMethod()
    this._setupIntercepters()
  }
  _initRequestMethod() {
    ;["GET", "POST", "PUT", "DELETE"].forEach((method) => {
      this[method.toLocaleLowerCase()] = (config, options) =>
        this.request({ ...config, method }, options)
    })
  }
  //   //设置拦截器
  _setupIntercepters() {
    const { intercepters } = this.options
    if (!intercepters) return
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = intercepters
    const axiosCanceler = new AxiosCanceler()
    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const { requestOptions } = this.options
      const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true

      !ignoreCancelToken && axiosCanceler.addPending(config)

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, requestInterceptorsCatch)

    // Request interceptor error capture
    // requestInterceptorsCatch &&
    //   isFunction(requestInterceptorsCatch) &&
    //   this.axiosInstance.interceptors.request.use(
    //     undefined,
    //     requestInterceptorsCatch
    //   )

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use(
      (res) => {
        res && axiosCanceler.removePending(res.config)
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res)
        }
        return res
      },
      (err) =>
        responseInterceptorsCatch &&
        isFunction(responseInterceptorsCatch) &&
        responseInterceptorsCatch(this.axiosInstance, error)
    )

    // Response result interceptor error capture
    // responseInterceptorsCatch &&
    //   isFunction(responseInterceptorsCatch) &&
    //   this.axiosInstance.interceptors.response.use(undefined, (error) => {
    //     return responseInterceptorsCatch(this.axiosInstance, error)
    //   })
  }

  request(requestConfig, options) {
    let config = cloneDeep(requestConfig)
    if (config.cancelToken) {
      config.cancelToken = requestConfig.cancelToken
    }
    const { requestOptions, hooks } = this.options
    const { beforeRequestHook, requestCatchHook, responseHook } = hooks || {}

    const opt = Object.assign({}, requestOptions, options)
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(config, opt)
    }
    config.requestOptions = opt
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res) => {
          if (responseHook && isFunction(responseHook)) {
            try {
              const ret = responseHook(res, opt)
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
