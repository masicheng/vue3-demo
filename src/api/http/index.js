import { isProduction } from "@/utils/is"
import { Axios } from "./Axios"
import { checkStatus } from "./utils"

const intercepters = {
  requestInterceptors: (config, options) => {
    console.log("requestInterceptors", config, options)
    return config
  },
  requestInterceptorsCatch: (err) => {
    console.log("requestInterceptorsCatch", err)
    // 对请求错误做些什么
    return Promise.reject(error)
  },
  responseInterceptors: (res) => {
    console.log("responseInterceptors", res)
    return res
  },
  responseInterceptorsCatch: (axiosInstance, err) => {
    console.log(err)
    checkStatus(err?.response?.status, err?.response?.data?.errMsg)
    return Promise.reject(err)
  },
}
const hooks = {
  beforeRequestHook: (config, options) => {
    console.log("beforeRequestHook", config)
    return config
  },
  responseHook: (res, options) => {
    console.log("responseHook", res)
    const { code = "", errMsg = "" } = res.data
    if (code == "0") {
      return Promise.resolve(res)
    } else {
      checkStatus(code, errMsg)
      return Promise.reject(res)
    }
  },
  responseCatchHook: (err) => {
    console.log(err)
  },
}
const createAxios = function () {
  return new Axios({
    baseURL: isProduction ? "" : "",
    intercepters,
    hooks,
  })
}

export const request = createAxios()
