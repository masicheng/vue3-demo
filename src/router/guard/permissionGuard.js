import { useUserStoreWithout } from "@/store/modules/user"
import { loginPath, homePath } from "@/setting/projectSetting"

export function createPermissionGuard(router) {
  const userStore = useUserStoreWithout()
  router.beforeEach((to, from) => {
    const token = userStore.getToken()
    if (!token && to.path !== loginPath) {
      return { path: loginPath }
    }
    if (token && to.path === loginPath) {
      return { path: homePath }
    }
  })
}
