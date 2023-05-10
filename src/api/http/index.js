import { Axios } from "./Axios"
import { checkStatus } from "./utils"

const intercepters = {
  requestInterceptors: (config) => {
    return config
  },
  requestInterceptorsCatch: (err) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
  responseInterceptors: (config) => {
    return config
  },
  responseInterceptorsCatch: (err) => {
    checkStatus(err?.response?.status, err?.response?.data?.errMsg)
  },
}

const createAxios = function () {
  return new Axios({
    baseURL: process.env.NODE_ENV === "production" ? "" : "",
    intercepters,
  })
}

export const request = createAxios()
