import { UpdateUserPage } from "@/features/app/shared/users/pages/update-user-page"

export default async function page(
    props: PageProps<"/dashboard/users/[id]/details">,
) {
    const id = (await props.params).id
    return <UpdateUserPage id={id} />
}
