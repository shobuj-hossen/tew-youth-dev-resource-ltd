"use client"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Edit,
    FileText,
    GraduationCap,
    MapPin,
    Phone,
    ShieldQuestion,
    User,
} from "lucide-react"
import { FullUser } from "../types"

function InfoItem({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType
    label: string
    value?: string
}) {
    if (!value) return null

    return (
        <div className="flex gap-3">
            <div className="text-muted-foreground mt-0.5">
                <Icon className="size-4" />
            </div>
            <div className="min-w-0">
                <p className="text-muted-foreground text-xs">
                    {label}
                </p>
                <p className="text-sm font-medium wrap-break-words">
                    {value}
                </p>
            </div>
        </div>
    )
}

export function ShowFullUser({ data }: { data: FullUser }) {
    const { data: userData } = data

    const initials = data.name
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>User Details</CardTitle>
                    <CardAction>
                        <Button variant={"secondary"}>
                            Edit <Edit />
                        </Button>
                    </CardAction>
                    <CardContent>{}</CardContent>
                </CardHeader>
            </Card>
            <Card>
                <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <Avatar className="size-20">
                        <AvatarImage
                            src={
                                userData?.profilePicture
                                    ?.secureUrl
                            }
                            alt={data.name}
                        />
                        <AvatarFallback className="text-lg">
                            {initials || (
                                <User className="size-7" />
                            )}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold">
                            {data.name}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                            {data.email}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-1">
                            <Badge variant="secondary">
                                {data.orgRole}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Personal Information
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 sm:grid-cols-2">
                    <InfoItem
                        icon={User}
                        label="Father's name"
                        value={userData?.fatherName}
                    />
                    <InfoItem
                        icon={User}
                        label="Mother's name"
                        value={userData?.motherName}
                    />
                    <InfoItem
                        icon={Phone}
                        label="Phone number"
                        value={userData?.phoneNumber}
                    />
                    <InfoItem
                        icon={MapPin}
                        label="Address"
                        value={userData?.address}
                    />
                    <InfoItem
                        icon={ShieldQuestion}
                        label="Gender"
                        value={userData?.gender}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">
                        Education & Documents
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <InfoItem
                        icon={GraduationCap}
                        label="Qualification"
                        value={userData?.qualification}
                    />

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <FileText className="text-muted-foreground size-4" />
                            <div>
                                <p className="text-sm font-medium">
                                    Curriculum Vitae
                                </p>
                                <p className="text-muted-foreground text-xs">
                                    {userData?.cv
                                        ? "Uploaded"
                                        : "Not uploaded"}
                                </p>
                            </div>
                        </div>

                        {userData?.cv && (
                            <Badge variant="secondary">
                                Available
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
