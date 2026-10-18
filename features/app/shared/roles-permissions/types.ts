import { getRolesAndPermissions } from "./queries"

export type RolesAndPermissions = Awaited<
    ReturnType<typeof getRolesAndPermissions>
>["rolesAndPermissions"]
export type DashboardType = Awaited<
    ReturnType<typeof getRolesAndPermissions>
>["dashboardType"]
