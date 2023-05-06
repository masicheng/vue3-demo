export function createPermissionGuard(router) {
  router.beforeEach((to, from) => {
    if (to.name !== "Login") {
      return { name: "Login" }
    }
  })
}
