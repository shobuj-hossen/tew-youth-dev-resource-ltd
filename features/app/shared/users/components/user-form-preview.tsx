"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrgUserFullSchemaType } from "../schemas"

export function UserFormPreview({
    orgUser,
}: {
    orgUser: OrgUserFullSchemaType
}) {
    const initials = orgUser.name
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    const details = [
        ["Email", orgUser.email],
        ["Phone", orgUser.phoneNumber],
        ["Gender", orgUser.gender],
        ["Father's Name", orgUser.fatherName],
        ["Mother's Name", orgUser.motherName],
        ["Address", orgUser.address],
        ["Qualification", orgUser.qualification],
    ].filter(([, value]) => value)

    return (
        <Card>
            <CardHeader className="flex-row items-center gap-4">
                <Avatar className="size-20">
                    {orgUser.profileFile && (
                        <AvatarImage
                            src={URL.createObjectURL(
                                orgUser.profileFile
                                    .croppedFile,
                            )}
                            alt={orgUser.name}
                        />
                    )}
                    <AvatarFallback className="text-lg">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <h3 className="truncate font-semibold">
                        {orgUser.name}
                    </h3>
                    <p className="text-muted-foreground truncate text-sm">
                        {orgUser.email}
                    </p>

                    {orgUser.cvFile && (
                        <Badge
                            variant="secondary"
                            className="mt-2"
                        >
                            CV attached
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-5">
                <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {details.map(([label, value]) => (
                        <div key={label}>
                            <p className="text-muted-foreground text-xs">
                                {label}
                            </p>
                            <p className="mt-0.5 text-sm font-medium">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
