"use server"

import { db } from "@/drizzle/db"
import { FormDefinition } from "@/types/form"
import { eq } from "drizzle-orm"
import slug from "slugify"

export async function buildForm(form: FormDefinition) {
    // const [existForm] = await db.select().from(forms).where(eq(forms.name, form.name));
    // if (existForm) return { success: false, message: "Form name already exists" };

    // const [newForm] = await db.insert(forms).values({
    //     name: form.name,
    //     slug: slug(form.name, { lower: true }),
    //     isPublished: true,
    // }).returning();
    // await db.insert(formVersions).values({
    //     formId: newForm.id,
    //     schema: form,
    //     version: 1,

    // });
    return {
        success: true,
        message: "New form is build successfully",
    }
}
