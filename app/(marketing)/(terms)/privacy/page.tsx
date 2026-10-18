import { ShieldCheck } from "lucide-react"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Privacy",
}
export default function PrivacyPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="h-10"></div>
            <div className="mb-12 border-b pb-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
                    <ShieldCheck className="size-4" />
                    <span>Legal</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Privacy Policy
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    Last updated September 29, 2026
                </p>
            </div>

            <div className="space-y-10 text-sm leading-7 text-muted-foreground sm:text-base">
                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        1. Introduction
                    </h2>
                    <p className="mt-3">
                        The Earn Way Youth Development
                        Resource respects your privacy and
                        is committed to protecting the
                        information you provide when using
                        our website, platform, courses, and
                        related services.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        2. Information We Collect
                    </h2>
                    <p className="mt-3">
                        Depending on how you use our
                        services, we may collect account
                        information such as your name, email
                        address, phone number, profile
                        information, and authentication
                        information.
                    </p>
                    <p className="mt-3">
                        We may also process organization
                        membership, roles, permissions,
                        course enrollment, student records,
                        applications, certificates, results,
                        uploaded documents, and other
                        information required to provide our
                        services.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        3. Technical Information
                    </h2>
                    <p className="mt-3">
                        When you use our platform, we may
                        collect technical information such
                        as your IP address, browser type,
                        device information, session
                        information, and interactions with
                        our services.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        4. How We Use Information
                    </h2>
                    <p className="mt-3">
                        We may use information to create and
                        manage accounts, authenticate users,
                        manage organizations and roles,
                        provide courses and educational
                        services, process applications and
                        enrollments, maintain academic
                        records, provide certificates and
                        result verification, communicate
                        with users, improve our services,
                        and protect the security of our
                        platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        5. Authentication and Security
                    </h2>
                    <p className="mt-3">
                        Our platform uses authentication and
                        access-control mechanisms to manage
                        accounts and secure user sessions.
                        Authentication may involve account
                        credentials, sessions, organization
                        membership, roles, and permissions.
                    </p>
                    <p className="mt-3">
                        Passwords are handled through
                        appropriate authentication
                        mechanisms and are not intended to
                        be stored by our application as
                        readable passwords.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        6. Organizations and Permissions
                    </h2>
                    <p className="mt-3">
                        Some users access our services
                        through an organization or branch.
                        Depending on their assigned role and
                        permissions, authorized users may be
                        able to access information necessary
                        to perform their responsibilities.
                    </p>
                    <p className="mt-3">
                        Access to organizational information
                        is intended to be controlled
                        according to the permissions
                        associated with each account.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        7. Uploaded Documents
                    </h2>
                    <p className="mt-3">
                        Our services may allow users or
                        organizations to upload documents,
                        images, identification materials,
                        academic records, or other files.
                        These files may be processed and
                        stored through our application and
                        authorized infrastructure providers
                        for the purposes for which they were
                        submitted.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        8. Information Sharing
                    </h2>
                    <p className="mt-3">
                        We do not sell your personal
                        information. Information may be
                        shared with authorized service
                        providers when necessary to operate
                        our platform, including providers
                        supporting authentication, hosting,
                        storage, media processing,
                        communications, and other technical
                        services.
                    </p>
                    <p className="mt-3">
                        We may also disclose information
                        when required by law, to protect our
                        services and users, or to prevent
                        fraud, abuse, or security incidents.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        9. Cookies
                    </h2>
                    <p className="mt-3">
                        We may use cookies and similar
                        technologies to maintain
                        authentication sessions, provide
                        essential platform functionality,
                        improve security, remember
                        preferences, and understand how our
                        services are used.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        10. Data Security
                    </h2>
                    <p className="mt-3">
                        We use reasonable technical and
                        organizational measures designed to
                        protect information from
                        unauthorized access, alteration,
                        disclosure, or destruction.
                    </p>
                    <p className="mt-3">
                        However, no internet-based service
                        can guarantee complete security.
                        Users should also take reasonable
                        steps to protect their accounts and
                        devices.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        11. Data Retention
                    </h2>
                    <p className="mt-3">
                        We retain information for as long as
                        reasonably necessary to provide our
                        services, maintain appropriate
                        records, fulfill legitimate
                        operational purposes, resolve
                        disputes, prevent misuse, and comply
                        with applicable legal requirements.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        12. Your Privacy Rights
                    </h2>
                    <p className="mt-3">
                        Depending on applicable law, you may
                        have rights regarding your personal
                        information, including the ability
                        to request access, correction,
                        updating, or deletion of certain
                        information.
                    </p>
                    <p className="mt-3">
                        Some information may need to be
                        retained where required for legal,
                        security, academic, or legitimate
                        operational purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        13. Third-Party Services
                    </h2>
                    <p className="mt-3">
                        Our platform may use third-party
                        providers for authentication,
                        hosting, storage, media management,
                        analytics, communications, and other
                        technical functionality. These
                        providers may process information
                        according to their own policies and
                        applicable agreements.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        14. Changes to This Policy
                    </h2>
                    <p className="mt-3">
                        We may update this Privacy Policy
                        when our services, information
                        practices, or legal requirements
                        change. The latest version will
                        always be published on this page
                        with a revised last-updated date.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        15. Contact
                    </h2>
                    <p className="mt-3">
                        If you have questions, concerns, or
                        requests relating to this Privacy
                        Policy or your personal information,
                        please contact The Earn Way Youth
                        Development Resource through the
                        contact information provided on our
                        website.
                    </p>
                </section>
            </div>
        </main>
    )
}
