import { Axios } from "./Axios"

const createAxios = function () {
  const config = {
    baseURL: process.env.NODE_ENV === "production" ? "" : "",
  }
  const axiosInstance = new Axios(config)
  axiosInstance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config
    },
    (err) => {
      // 对请求错误做些什么
      return Promise.reject(error)
    }
  )
  axiosInstance.interceptors.response.use(function(config){

  },err=>{

  })
}

export const request = createAxios()
