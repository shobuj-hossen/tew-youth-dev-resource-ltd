"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { resources } from "@/lib/resources"
import { DashboardType } from "../types"

type PermissionsProps = {
    permissions: Record<string, string[]>
    onValueChange: (
        resource: string,
        permission: string,
        checked: boolean,
    ) => void

    dashboardType: DashboardType
}

export function Permissions({
    onValueChange,
    permissions,
    dashboardType,
}: PermissionsProps) {
    const appropriateResources =
        dashboardType === "COMPANY"
            ? resources.company
            : resources.branch
    return (
        <div className="divide-y space-y-6">
            {Object.entries(appropriateResources).map(
                ([resource, staticValues]) => (
                    <Resource
                        key={resource}
                        resource={resource}
                        staticValues={staticValues}
                        values={permissions[resource]}
                        onValueChange={onValueChange}
                    />
                ),
            )}
        </div>
    )
}

type PresourceProps = {
    staticValues: readonly string[]
    values: string[] | undefined
    resource: string
    onValueChange: (
        resource: string,
        permission: string,
        checked: boolean,
    ) => void
}

function Resource({
    onValueChange,
    resource,
    staticValues,
    values,
}: PresourceProps) {
    return (
        <div className="space-y-3 py-3">
            <div>
                <h3 className="font-medium capitalize">
                    {resource.replaceAll("_", " ")}
                </h3>
                <p className="text-sm text-muted-foreground">
                    Manage {resource.replaceAll("_", " ")}{" "}
                    permissions
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {staticValues.map((value) => {
                    const id = `${resource}-${value}`
                    const valueExists =
                        values?.includes(value) || false
                    return (
                        <Label
                            key={value}
                            htmlFor={id}
                            className="flex cursor-pointer items-center justify-between rounded-full bg-input/30 border p-3 font-normal"
                        >
                            <span className="capitalize">
                                {value.replaceAll("-", " ")}
                            </span>

                            <Checkbox
                                id={id}
                                checked={valueExists}
                                onCheckedChange={(
                                    checked,
                                ) =>
                                    onValueChange(
                                        resource,
                                        value,
                                        checked,
                                    )
                                }
                            />
                        </Label>
                    )
                })}
            </div>
        </div>
    )
}
