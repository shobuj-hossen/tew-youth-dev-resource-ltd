"use client"

import { FileText, Mail, MapPin, User } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BranchById } from "../types"

export function BranchDetails({
    branch,
}: {
    branch: BranchById
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-14 rounded-md">
                            <AvatarImage
                                src={
                                    branch.logo ?? undefined
                                }
                                alt={branch.name}
                            />
                            <AvatarFallback className="rounded-md">
                                {branch.name
                                    .charAt(0)
                                    .toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <CardTitle>
                                {branch.name}
                            </CardTitle>
                            <CardDescription className="mt-1">
                                Branch information and
                                documents
                            </CardDescription>
                        </div>
                    </div>

                    <Badge variant="secondary">
                        Active
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <MapPin className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Branch
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {branch.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <User className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Branch ID
                            </p>
                            <p className="max-w-48 truncate text-sm text-muted-foreground">
                                {branch.id}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <Mail className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Email
                            </p>
                            <p className="max-w-48 truncate text-sm text-muted-foreground">
                                {branch.email}
                            </p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md bg-muted">
                            <FileText className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">
                                Branch Documents
                            </p>
                            <p className="text-sm text-muted-foreground">
                                View and download branch
                                documents
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
