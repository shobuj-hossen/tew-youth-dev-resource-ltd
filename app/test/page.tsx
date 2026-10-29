"use client"

import { Button } from "@/components/ui/button"
import { CustomSMSDialog } from "@/lib/bulk-sms/ui/custom-sms-wrapper"
import React, { useState } from "react"

export default function page() {
    const [openCustomSMS, setOpenCustomSMS] =
        useState(false)
    return (
        <div>
            Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Fuga vitae voluptatum
            excepturi obcaecati at, quos rem voluptates
            laborum aperiam sapiente. Omnis, fuga? Labore
            dolore, deserunt similique architecto fugiat
            voluptate adipisci.
            <CustomSMSDialog
                recipients={[
                    {
                        id: "4",
                        name: "ahmed",
                        phoneNumber: "0195443333",
                    },
                ]}
                open={openCustomSMS}
                setOpen={setOpenCustomSMS}
            ></CustomSMSDialog>
            <Button onClick={() => setOpenCustomSMS(true)}>
                Click Open
            </Button>
        </div>
    )
}
