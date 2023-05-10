import { request } from "./http"

export default {
  login: (data) => request.post({ url: "/login", data }),
}
