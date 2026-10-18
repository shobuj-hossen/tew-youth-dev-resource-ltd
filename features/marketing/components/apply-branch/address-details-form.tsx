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

import {
    DISTRICTS,
    DIVISIONS,
    UPAZILAS,
} from "@/constants/bd-locations"
import { useSelector } from "@tanstack/react-form"
import {
    addressDetailsSchema,
    AddressDetailsSchemaType,
    BranchApplicationSchemaType,
} from "../../schemas"

export function AddressDetailsForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: AddressDetailsSchemaType) => void
    formId: string
    existedValues: BranchApplicationSchemaType
}) {
    const defaultValues: AddressDetailsSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: addressDetailsSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    const divisionId = useSelector(
        form.store,
        (state) => state.values.divisionId,
    )
    const districtsId = useSelector(
        form.store,
        (state) => state.values.districtId,
    )
    const districts = DISTRICTS.filter(
        (d) => d.division_id === divisionId,
    )
    const upazilas = UPAZILAS.filter(
        (d) => d.district_id === districtsId,
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Branch Address</CardTitle>
                <CardDescription>
                    Provide the complete location and postal
                    address of the branch.
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
                        <form.AppField
                            name="divisionId"
                            children={(field) => (
                                <field.SelectField
                                    label="Division"
                                    placeholder="Select or enter the division"
                                    options={DIVISIONS.map(
                                        (d) => ({
                                            label: d.name,
                                            value: d.id,
                                        }),
                                    )}
                                />
                            )}
                        />

                        <form.AppField
                            name="districtId"

                            children={(field) => (
                                <field.SelectField
                                    label="District"
                                    placeholder="Select or enter the district"
                                    options={districts.map(
                                        (d) => ({
                                            label: d.name,
                                            value: d.id,
                                        }),
                                    )}
                                    disabled={
                                        !districts.length
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="upazilaId"
                            children={(field) => (
                                <field.SelectField
                                    label="Upazila"
                                    placeholder="Select or enter the upazila"
                                    options={upazilas.map(
                                        (u) => ({
                                            label: u.name,
                                            value: u.id,
                                        }),
                                    )}
                                    disabled={
                                        !upazilas.length
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="area"
                            children={(field) => (
                                <field.TextareaField
                                    label="Area / Village"
                                    placeholder="Enter the area, village, or locality"
                                />
                            )}
                        />

                        <form.AppField
                            name="postalCode"
                            children={(field) => (
                                <field.TextField
                                    label="Postal Code"
                                    placeholder="Enter the 4-digit postal code"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
