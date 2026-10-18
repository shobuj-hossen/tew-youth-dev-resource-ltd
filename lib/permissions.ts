import { createAccessControl } from "better-auth/plugins/access"
import {
    defaultStatements,
    ownerAc,
} from "better-auth/plugins/organization/access"
import {
    branch_application,
    course,
    overview,
    branches,
    roles_permissions,
    students,
    users,
    sidebar,
} from "./resources"

const statement = {
    ...defaultStatements,
    course,
    branch_application,
    overview,
    branches,
    roles_permissions,
    students,
    users,
    sidebar,
} as const

export const ac = createAccessControl(statement)

export const owner = ac.newRole({
    course: statement.course,
    branches: statement.branches,
    branch_application: statement.branch_application,
    overview: statement.overview,
    roles_permissions: statement.roles_permissions,
    students: statement.students,
    users: statement.users,
    sidebar: statement.sidebar,
    ...ownerAc.statements,
})
