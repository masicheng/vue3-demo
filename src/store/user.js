import { defineStore } from "pinia"
import { ref } from "vue"
import { localStorageUtil } from "@/utils/storage"
import  router  from "@/router"
import { Modal } from "ant-design-vue"
import api from '@/api'

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({})
  async function  login(param) {
    const {goHome=true,mode="",}
    this.userInfo = userInfo
    const data =await api.login(loginParam)
    this.setToken(token)
  }
  function setToken(token){
    localStorageUtil.setItem('token',)
  }
  function getToken(){
    return localStorageUtil.getItem('token')
  }
  function logout(goLogin = false) {
    this.userInfo = {}
    localStorageUtil.clear()
    goLogin && router.push("Login")
  }
//   function after
  async function getUserInfoAsync(token){

  }
  function confirmLoginout(errMsg) {
    Modal.confirm({
      title: errMsg,
      content: "点击确认前往授权登录",
      onOk: async () => {
        await this.logout(true)
      },
    })
  }
  return {userInfo,login,logout,confirmLoginout}
})
