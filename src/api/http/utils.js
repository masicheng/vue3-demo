
import { useUserStore } from "@/store/user"
import { Modal, message } from "ant-design-vue"

const ERROR_MSG = {
    errMsg400: "请求不合法，服务器无法理解该请求",
    errMsg401: "用户没有权限（令牌、用户名、密码错误）!",
    errMsg403: "用户得到授权，但是访问是被禁止的。!",
    errMsg404: "网络请求错误,未找到该资源!",
    errMsg405: "网络请求错误,请求方法未允许!",
    errMsg408: "网络请求超时!",
    errMsg500: "服务器错误,请联系管理员!",
    errMsg501: "网络未实现!",
    errMsg502: "网络错误!",
    errMsg503: "服务不可用，服务器暂时过载或维护!",
    errMsg504: "网络超时!",
    errMsg505: "http版本不支持该请求!",
  }
export const checkStatus = function (status, msg) {
  let errMsg = msg || ERROR_MSG[`errMsg${status}`]
  if (status == "401") {
    useUserStore.confirmLoginout()
  } else {
    message.error(errMsg)
  }
}
