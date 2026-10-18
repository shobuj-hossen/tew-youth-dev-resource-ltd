"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { Plus, Trash2 } from "lucide-react"

import {
    AcademicInformationSchemaType,
    updateStudentSchema,
    UpdateStudentSchemaType,
} from "../../schemas"
import {
    ACADEMIC_LEVEL_OPTIONS,
    INSTITUTION_OPTIONS,
} from "../../constants"

const academicInformationDefaults: AcademicInformationSchemaType =
    {
        level: "",
        institution: "",
        passingYear: new Date().getFullYear(),
        rollId: "",
        result: "",
    }

export function AcademicInformationForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (
        v: Pick<
            UpdateStudentSchemaType,
            "academicInformation"
        >,
    ) => void
    formId: string
    existedValues: UpdateStudentSchemaType
}) {
    const defaultValues = {
        academicInformation:
            existedValues.academicInformation.length > 0
                ? existedValues.academicInformation
                : [academicInformationDefaults],
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: updateStudentSchema.pick({
                academicInformation: true,
            }),
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Academic Information</CardTitle>
                <CardDescription>
                    Add the student's academic
                    qualifications. You can add multiple
                    qualifications.
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
                        <form.Field
                            name="academicInformation"
                            mode="array"
                        >
                            {(field) => (
                                <div className="space-y-6">
                                    {field.state.value.map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="space-y-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h3 className="font-medium">
                                                            Qualification{" "}
                                                            {index +
                                                                1}
                                                        </h3>

                                                        <p className="text-sm text-muted-foreground">
                                                            Provide
                                                            the
                                                            academic
                                                            qualification
                                                            details.
                                                        </p>
                                                    </div>

                                                    {field
                                                        .state
                                                        .value
                                                        .length >
                                                        1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                field.removeValue(
                                                                    index,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 />
                                                            Remove
                                                        </Button>
                                                    )}
                                                </div>

                                                <FieldGroup>
                                                    <form.AppField
                                                        name={`academicInformation[${index}].level`}
                                                        children={(
                                                            field,
                                                        ) => (
                                                            <field.SelectField
                                                                label="Academic Level"
                                                                placeholder="Select academic level"
                                                                options={
                                                                    ACADEMIC_LEVEL_OPTIONS
                                                                }
                                                            />
                                                        )}
                                                    />

                                                    <form.AppField
                                                        name={`academicInformation[${index}].institution`}
                                                        children={(
                                                            field,
                                                        ) => (
                                                            <field.SelectField
                                                                label="Institution"
                                                                placeholder="Select institution"
                                                                options={
                                                                    INSTITUTION_OPTIONS
                                                                }
                                                            />
                                                        )}
                                                    />
                                                    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                        <form.AppField
                                                            name={`academicInformation[${index}].passingYear`}
                                                            children={(
                                                                field,
                                                            ) => (
                                                                <field.TextField
                                                                    label="Passing Year"
                                                                    placeholder="Enter passing year"
                                                                />
                                                            )}
                                                        />

                                                        <form.AppField
                                                            name={`academicInformation[${index}].rollId`}
                                                            children={(
                                                                field,
                                                            ) => (
                                                                <field.TextField
                                                                    label="Roll / ID"
                                                                    placeholder="Enter roll or ID"
                                                                />
                                                            )}
                                                        />

                                                        <form.AppField
                                                            name={`academicInformation[${index}].result`}
                                                            children={(
                                                                field,
                                                            ) => (
                                                                <field.TextField
                                                                    label="Result / GPA"
                                                                    placeholder="Enter result or GPA"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </FieldGroup>
                                            </div>
                                        ),
                                    )}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            field.pushValue(
                                                academicInformationDefaults,
                                            )
                                        }
                                    >
                                        <Plus />
                                        Add More
                                        Qualifications
                                    </Button>
                                </div>
                            )}
                        </form.Field>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
