import { defineStore } from "pinia"
import { store } from "@/store"
import { reactive, ref } from "vue"
import { localStorageUtil } from "@/utils/storage"
import { router } from "@/router"
import { Modal } from "ant-design-vue"
import api from "@/api"
import { loginPath, homePath } from "@/setting/projectSetting"

const USER_INFO_KEY = "userInfo"

export const useUserStore = defineStore("user", () => {
  const userInfo = reactive(localStorageUtil.getItem("userInfo") || {})
  const token = ref(localStorageUtil.getItem("token")||'')
  async function login(params = {}) {
    const { goHome = true, mode = "", ...loginParams } = params
    const { token } = (await api.login(loginParams)).data
    this.setToken(token)
    return this.afterLoginAction(goHome)
  }
  function setUserInfo(userInfo) {
    this.userInfo = userInfo
    localStorageUtil.setItem("userInfo", userInfo)
  }
  function getUserInfo() {
    return (
      this.userInfo || (this.userInfo = localStorageUtil.getItem("userInfo"))
    )
  }
  function setToken(token) {
    this.token = token || ""
    localStorageUtil.setItem("token", token)
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
  async function afterLoginAction(goHome) {
    if (!this.token) return null
    const userInfo = (await api.getUserInfo(token)).data
    this.setUserInfo(userInfo)
    goHome && (await router.replace({ path: homePath }))
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
    setUserInfo,
    getUserInfo,
    login,
    afterLoginAction,
    logout,
    confirmLoginout,
  }
})

export function useUserStoreWithout() {
  return useUserStore(store)
}
