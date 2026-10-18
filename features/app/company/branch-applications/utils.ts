import { auth } from "@/lib/auth"
import "server-only"
import slugify from "slugify"

export function generateSlug(name: string): string {
    return slugify(name, {
        lower: true,
        strict: true,
        trim: true,
    })
}

async function isSlugExist(slug: string): Promise<boolean> {
    try {
        await auth.api.checkOrganizationSlug({
            body: { slug },
        })
        return true
    } catch (error) {
        return false
    }
}

export async function createUniqueOrgSlug(
    name: string,
): Promise<string> {
    const baseSlug = generateSlug(name)
    let candidateSlug = baseSlug
    let counter = 1

    while (!(await isSlugExist(candidateSlug))) {
        candidateSlug = `${baseSlug}-${counter}`
        counter++
    }

    return candidateSlug
}
