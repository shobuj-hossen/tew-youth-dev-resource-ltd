"use client"

import React, { useState, useTransition } from "react"
import { handlePaymentInitiation } from "./action"

interface SSLCreatePaymentInput {
    amount: number
    orderId: string
    type: "branch" | "student"
    customerName: string
    customerEmail: string
    customerPhone: string
    address: string
    city: string
    postcode: string
}

export default function TestPaymentUI() {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const [paymentData] = useState<SSLCreatePaymentInput>({
        amount: 2500.0,
        orderId: `SERVER_ACT_${crypto.randomUUID().slice(0, 6)}`,
        type: "branch",
        customerName: "Jane Doe",
        customerEmail: "janedoe@example.com",
        customerPhone: "01812345678",
        address: "Dhanmondi 27",
        city: "Dhaka",
        postcode: "1209",
    })

    const handleTestPayment = () => {
        setError(null)

        // useTransition wraps the server execution smoothly
        startTransition(async () => {
            const result =
                await handlePaymentInitiation(paymentData)

            if (result.success && result.url) {
                // Perform the absolute browser-level redirect to SSLCommerz sandbox panel
                window.location.href = result.url
            } else {
                setError(
                    result.error || "Something went wrong.",
                )
            }
        })
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <div className="mb-6 text-center">
                <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                    Next.js Server Action Context
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-2">
                    SSLCommerz Checkout
                </h2>
                <p className="text-sm text-gray-500">
                    Testing via secure inline server action
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">
                    ❌ {error}
                </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg mb-6 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Order Tracking ID:</span>
                    <span className="font-mono text-gray-900 font-semibold">
                        {paymentData.orderId}
                    </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Customer:</span>
                    <span className="text-gray-900 font-medium">
                        {paymentData.customerName}
                    </span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-gray-800">
                    <span className="font-medium">
                        Total:
                    </span>
                    <span className="text-lg font-bold text-emerald-600">
                        {paymentData.amount.toFixed(2)} BDT
                    </span>
                </div>
            </div>

            <button
                onClick={handleTestPayment}
                disabled={isPending}
                className={`w-full py-3 px-4 text-white font-medium rounded-lg transition-all shadow ${
                    isPending
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98]"
                }`}
            >
                {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Contacting Gateway Server...
                    </div>
                ) : (
                    "Pay Now"
                )}
            </button>
        </div>
    )
}
