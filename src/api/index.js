import { request } from "@/utils/http"

export default {
  login: (data) => request.post({ url: "/login", data }),
  getUserInfo: (data) => request.get({ url: "/getUserInfo", data }),
}
