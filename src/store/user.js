import { defineStore } from "pinia"
import { ref } from "vue"
import { localStorage } from "../utils/storage"

export const useUserStore = defineStore("user", () => {
  const userInfo = ref({})
  function login(userInfo) {
    this.userInfo = userInfo
    localStorage.setItem("userInfo", this.userInfo)
  }
  function logout() {
    this.userInfo = {}
    localStorage.clear()
  }
})
