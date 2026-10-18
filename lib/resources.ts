export const resources = {
    company: {
        overview: ["view"] as const,
        branches: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        course: [
            "view",
            "create",
            "update",
            "delete",
            "change-status",
        ] as const,

        branch_application: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
    },

    branch: {
        students: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
    },
    common: {
        users: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        roles_permissions: [
            "view",
            "create",
            "update",
            "delete",
        ] as const,
        sidebar: ["view"] as const,
    },
}

export const {
    course,
    branch_application,
    overview,
    branches,
} = resources.company
export const { students } = resources.branch
export const { users, roles_permissions, sidebar } =
    resources.common
