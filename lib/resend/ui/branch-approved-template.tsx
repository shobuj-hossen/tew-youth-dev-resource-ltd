export interface ApproveBranchEmailTemplateProps {
    firstName: string
    branchName: string
    email: string
    password: string
    loginUrl: string
}

export function BranchApprovedTemplate({
    firstName,
    branchName,
    email,
    password,
    loginUrl,
}: ApproveBranchEmailTemplateProps) {
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
                    <p
                        style={{
                            margin: "0 0 10px",
                            fontSize: "13px",
                            lineHeight: "20px",
                            fontWeight: 600,
                            color: "#6b7280",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                        }}
                    >
                        Branch Account
                    </p>

                    <h1
                        style={{
                            margin: 0,
                            fontSize: "22px",
                            lineHeight: "30px",
                            fontWeight: 700,
                            color: "#111827",
                        }}
                    >
                        Your branch has been approved
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
                        Your branch application for{" "}
                        <strong
                            style={{ color: "#111827" }}
                        >
                            {branchName}
                        </strong>{" "}
                        has been approved. Your branch
                        account is now ready to use.
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
                                margin: "0 0 14px",
                                fontSize: "14px",
                                lineHeight: "22px",
                                fontWeight: 600,
                                color: "#111827",
                            }}
                        >
                            Your sign-in details
                        </p>

                        <p
                            style={{
                                margin: "0 0 8px",
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#4b5563",
                            }}
                        >
                            <strong
                                style={{ color: "#374151" }}
                            >
                                Email:
                            </strong>{" "}
                            {email}
                        </p>

                        <p
                            style={{
                                margin: 0,
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#4b5563",
                            }}
                        >
                            <strong
                                style={{ color: "#374151" }}
                            >
                                Temporary password:
                            </strong>{" "}
                            {password}
                        </p>
                    </div>

                    <div
                        style={{
                            margin: "0 0 28px",
                        }}
                    >
                        <a
                            href={loginUrl}
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
                            Sign in to your branch
                        </a>
                    </div>

                    <div
                        style={{
                            margin: "0 0 24px",
                            padding: "18px 20px",
                            backgroundColor: "#fffbeb",
                            border: "1px solid #f3e8b0",
                            borderRadius: "8px",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: "14px",
                                lineHeight: "22px",
                                color: "#6b5a16",
                            }}
                        >
                            For your security, please sign
                            in and change your temporary
                            password as soon as possible. Do
                            not share your password with
                            anyone.
                        </p>
                    </div>

                    <p
                        style={{
                            margin: "0 0 16px",
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#6b7280",
                        }}
                    >
                        If you did not expect this account
                        or believe this email was sent to
                        you by mistake, please contact the
                        appropriate administrator before
                        signing in.
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#6b7280",
                        }}
                    >
                        Your branch account provides access
                        to the services and workspace
                        associated with your approved
                        branch.
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
                            margin: "0 0 6px",
                            fontSize: "12px",
                            lineHeight: "20px",
                            color: "#9ca3af",
                        }}
                    >
                        This is an automated account
                        notification. Please do not reply to
                        this message.
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "12px",
                            lineHeight: "20px",
                            color: "#9ca3af",
                        }}
                    >
                        The Earn Way Youth Development
                        Resource
                    </p>
                </div>
            </div>
        </div>
    )
}
