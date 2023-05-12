import { isProduction } from "@/utils/is"
import { Axios } from "./Axios"
import { checkStatus } from "./utils"

const intercepters = {
  requestInterceptors: (config, options) => {
    return config
  },
  requestInterceptorsCatch: (err) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
  responseInterceptors: (res) => {
    console.log("responseInterceptors", res)
    const { code = "", errMsg = "" } = res.data
    if (code == "200") {
    } else {
      checkStatus(code, errMsg)
    }
    return res
  },
  responseInterceptorsCatch: (axiosInstance, err) => {
    console.log(err)
    checkStatus(err?.response?.status, err?.response?.data?.errMsg)
  },
}

const createAxios = function () {
  return new Axios({
    baseURL: isProduction ? "" : "",
    intercepters,
  })
}

export const request = createAxios()
