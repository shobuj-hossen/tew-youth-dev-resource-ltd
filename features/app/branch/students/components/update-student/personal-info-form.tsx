"use client"

import { useAppForm } from "@/components/form/use-app-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"

import { capitalize } from "@/utils/helpers"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    updatedPersonalInformationSchema,
    UpdatedPersonalInformationSchemaType,
    UpdateStudentSchemaType,
} from "../../schemas"
import { BLOOD_GROUPS, GENDER } from "../../constants"

export function PersonalInformationForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (
        v: UpdatedPersonalInformationSchemaType,
    ) => void
    formId: string
    existedValues: UpdateStudentSchemaType
}) {
    const defaultValues: UpdatedPersonalInformationSchemaType =
        {
            ...existedValues,
        }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: updatedPersonalInformationSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })
    const [changeImage, setChangeImage] = useState(false)

    const imageUrl = existedValues.image
        ? URL.createObjectURL(
              existedValues.image.croppedFile,
          )
        : existedValues.existingImage.secureUrl

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                    Provide the student's personal and
                    identification details.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id={formId}
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        {changeImage ? (
                            <form.AppField
                                name="image"
                                children={(field) => (
                                    <field.AvatarField label="Student Image" />
                                )}
                            />
                        ) : (
                            <div className="space-y-1.5">
                                <Image
                                    className="w-40 rounded-full aspect-square object-cover"
                                    src={imageUrl}
                                    height={100}
                                    width={200}
                                    alt="banner-img"
                                />
                                <Button
                                    onClick={() =>
                                        setChangeImage(true)
                                    }
                                    variant={"ghost"}
                                    className={
                                        "text-destructive"
                                    }
                                >
                                    Change
                                </Button>
                            </div>
                        )}

                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField
                                    label="Full Name"
                                    placeholder="Enter the student's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="fatherName"
                            children={(field) => (
                                <field.TextField
                                    label="Father's Name"
                                    placeholder="Enter the student's father's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="motherName"
                            children={(field) => (
                                <field.TextField
                                    label="Mother's Name"
                                    placeholder="Enter the student's mother's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="mobile"
                            children={(field) => (
                                <field.TextField
                                    label="Mobile Number"
                                    placeholder="Enter the student's mobile number"
                                />
                            )}
                        />
                        <form.AppField
                            name="dateOfBirth"
                            children={(field) => (
                                <field.DatePickerField label="Date of Birth" />
                            )}
                        />

                        <form.AppField
                            name="religion"
                            children={(field) => (
                                <field.TextField
                                    label="Religion"
                                    placeholder="Enter the student's religion"
                                />
                            )}
                        />

                        <form.AppField
                            name="bloodGroup"
                            children={(field) => (
                                <field.SelectField
                                    label="Blood Group"
                                    placeholder="Select the blood group"
                                    options={BLOOD_GROUPS.map(
                                        (bloodGroup) => ({
                                            label: capitalize(
                                                bloodGroup,
                                            ),
                                            value: bloodGroup,
                                        }),
                                    )}
                                />
                            )}
                        />

                        <form.AppField
                            name="nationality"
                            children={(field) => (
                                <field.TextField
                                    label="Nationality"
                                    placeholder="Enter the student's nationality"
                                />
                            )}
                        />

                        <form.AppField
                            name="gender"
                            children={(field) => (
                                <field.SelectField
                                    label="Gender"
                                    placeholder="Select the student's gender"
                                    options={GENDER.map(
                                        (gender) => ({
                                            label: capitalize(
                                                gender,
                                            ),
                                            value: gender,
                                        }),
                                    )}
                                />
                            )}
                        />

                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email (optional)"
                                    placeholder="Enter the student's email address"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
