import { createPermissionGuard } from "./permissionGuard";

export function setupRouterGuard(router){
    createPermissionGuard(router)
}
