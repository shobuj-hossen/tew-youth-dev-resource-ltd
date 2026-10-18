export type NavItem = {
    title: string
    url?: string
    items?: NavItem[]
    disabled?: boolean
}

export type NavDataType = {
    navMenuForCompany: NavItem[]
    navMenuForBranch: NavItem[]
    navCommon: NavItem[]
}

export const navData: NavDataType = {
    navMenuForCompany: [
        {
            title: "Manage",

            items: [
                {
                    title: "Courses",
                    url: "/dashboard/courses",
                },
                {
                    title: "Branches",
                    url: "/dashboard/branches",
                },
                {
                    title: "Branch Applications",
                    url: "/dashboard/branch-applications",
                },
            ],
        },
    ],
    navMenuForBranch: [
        {
            title: "Manage",

            items: [
                {
                    title: "Students",
                    url: "/dashboard/students",
                },
                {
                    title: "Unpaid Students",
                    url: "/dashboard/unpaid-students",
                },
                {
                    title: "New Student",
                    url: "/dashboard/new-student",
                },
            ],
        },
    ],
    navCommon: [
        {
            title: "Menu",

            items: [
                {
                    title: "Overviews",
                    url: "/dashboard/overviews",
                },
            ],
        },
        {
            title: "Settings",

            items: [
                {
                    title: "Users",
                    url: "/dashboard/users",
                },
                {
                    title: "Roles & Permissions",
                    url: "/dashboard/roles-permissions",
                },
            ],
        },
    ],
}
