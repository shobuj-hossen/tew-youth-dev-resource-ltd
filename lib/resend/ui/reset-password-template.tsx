interface EmailTemplateProps {
    firstName: string
    url: string
    email: string
}

export function ResetPasswordTemplate({
    firstName,
    url,
    email,
}: EmailTemplateProps) {
    return (
        <div
            style={{
                backgroundColor: "#f6f7f9",
                padding: "40px 20px",
                fontFamily: "Arial, Helvetica, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "560px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        padding: "32px 36px",
                        borderBottom: "1px solid #e5e7eb",
                    }}
                >
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "22px",
                            lineHeight: "30px",
                            fontWeight: 700,
                            color: "#111827",
                        }}
                    >
                        Reset your password
                    </h1>
                </div>

                <div
                    style={{
                        padding: "36px",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 16px",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "#374151",
                        }}
                    >
                        Hi {firstName},
                    </p>

                    <p
                        style={{
                            margin: "0 0 24px",
                            fontSize: "16px",
                            lineHeight: "26px",
                            color: "#374151",
                        }}
                    >
                        We received a request to reset the
                        password for your account associated
                        with {email}.
                    </p>

                    <div
                        style={{
                            margin: "0 0 28px",
                            padding: "20px",
                            backgroundColor: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#4b5563",
                            }}
                        >
                            Click the button below to create
                            a new password. For your
                            security, this link will expire
                            after a limited time.
                        </p>
                    </div>

                    <div
                        style={{
                            margin: "0 0 28px",
                        }}
                    >
                        <a
                            href={url}
                            style={{
                                display: "inline-block",
                                padding: "13px 22px",
                                backgroundColor: "#111827",
                                color: "#ffffff",
                                fontSize: "15px",
                                lineHeight: "20px",
                                fontWeight: 600,
                                textDecoration: "none",
                                borderRadius: "7px",
                            }}
                        >
                            Reset password
                        </a>
                    </div>

                    <p
                        style={{
                            margin: "0 0 16px",
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#6b7280",
                        }}
                    >
                        If you didn't request a password
                        reset, you can safely ignore this
                        email. Your password will remain
                        unchanged.
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#6b7280",
                        }}
                    >
                        For security reasons, please don't
                        forward this email or share your
                        reset link with anyone.
                    </p>
                </div>

                <div
                    style={{
                        padding: "24px 36px",
                        backgroundColor: "#f9fafb",
                        borderTop: "1px solid #e5e7eb",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: "20px",
                            color: "#9ca3af",
                        }}
                    >
                        This is an automated security email.
                        Please do not reply to this message.
                    </p>
                </div>
            </div>
        </div>
    )
}
