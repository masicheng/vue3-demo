import { defineStore } from "pinia"
import { ref } from "vue"
import { localStorageUtil } from "@/utils/storage"
import  router  from "@/router"


export const useUserStore = defineStore("user", () => {
  const userInfo = ref({})
  function login(userInfo) {
    this.userInfo = userInfo
    localStorageUtil.setItem("userInfo", this.userInfo)
  }
  function logout(goLogin = false) {
    this.userInfo = {}
    localStorageUtil.clear()
    goLogin && router.push("Login")
  }
  function confirmLoginout() {
    Modal.confirm({
      title: errMsg,
      content: "点击确认前往授权登录",
      onOk: async () => {
        await this.logout(true)
      },
    })
  }
})
