import { defineStore } from "pinia"
import { store } from "@/store"
import { ref } from "vue"
import { localStorageUtil } from "@/utils/storage"
import { router } from "@/router"
import { Modal } from "ant-design-vue"
import api from "@/api"
import { loginPath,homePath } from "@/setting/projectSetting"

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({})
  const token = ref("")
  async function login(params = {}) {
    const { goHome = true, mode = "", ...loginParams } = params
    const { token } = (await api.login(loginParams)).data
    await this.getUserInfoAsync(token)
    this.setToken(token)
    goHome && (await router.replace({ path: homePath }))
  }

  function setToken(token) {
    this.token = token || ""
    localStorageUtil.setItem("token",token)
  }
  function getToken() {
    return this.token || (this.token = localStorageUtil.getItem("token"))
  }

  function logout(goLogin = true) {
    this.userInfo = null
    localStorageUtil.clear()
    goLogin && router.push(loginPath)
  }
  //   function after
  async function getUserInfoAsync(token) {
    const userInfo = await api.getUserInfo(token)
    this.userInfo = userInfo
    return userInfo
  }
  function confirmLoginout(errMsg) {
    Modal.confirm({
      title: errMsg,
      content: "点击确认前往授权登录",
      onOk: async () => {
        await this.logout()
      },
    })
  }
  return {
    userInfo,
    token,
    setToken,
    getToken,
    login,
    getUserInfoAsync,
    logout,
    confirmLoginout,
  }
})

export function useUserStoreWithout() {
  return useUserStore(store)
}
