import { FileText } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Terms",
}
export default function TermsPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="h-10"></div>
            <div className="mb-12 border-b pb-8">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
                    <FileText className="size-4" />
                    <span>Legal</span>
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Terms of Service
                </h1>

                <p className="mt-3 text-sm text-muted-foreground">
                    Last updated September 29, 2026
                </p>
            </div>

            <div className="space-y-10 text-sm leading-7 text-muted-foreground sm:text-base">
                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        1. Acceptance of Terms
                    </h2>
                    <p className="mt-3">
                        Welcome to The Earn Way Youth
                        Development Resource. By accessing
                        or using our website, platform,
                        courses, applications, or related
                        services, you agree to these Terms
                        of Service. If you do not agree with
                        these terms, please do not use our
                        services.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        2. Our Services
                    </h2>
                    <p className="mt-3">
                        The Earn Way Youth Development
                        Resource provides educational,
                        training, skills-development, and
                        related organizational services.
                        Depending on your role, our platform
                        may provide access to courses,
                        students, applications,
                        certificates, results,
                        organizations, branches, and
                        administrative tools.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        3. User Accounts
                    </h2>
                    <p className="mt-3">
                        Certain features require an account.
                        You are responsible for providing
                        accurate information, protecting
                        your authentication credentials, and
                        maintaining the security of your
                        account.
                    </p>
                    <p className="mt-3">
                        You must not share your account
                        credentials with unauthorized
                        individuals or use another person's
                        account without permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        4. Organizations and Access
                    </h2>
                    <p className="mt-3">
                        Our platform may provide
                        organization and branch workspaces.
                        Access to information and
                        functionality may depend on your
                        assigned organization, role, and
                        permissions.
                    </p>
                    <p className="mt-3">
                        Users must not attempt to access
                        organizations, accounts, records,
                        administrative functions, or other
                        resources for which they are not
                        authorized.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        5. User Responsibilities
                    </h2>
                    <p className="mt-3">
                        You agree to use our services
                        lawfully and responsibly. You must
                        not misuse the platform, provide
                        intentionally false information,
                        interfere with our services,
                        circumvent security controls, upload
                        harmful content, or attempt
                        unauthorized access.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        6. Courses and Educational Services
                    </h2>
                    <p className="mt-3">
                        Course information, availability,
                        schedules, duration, requirements,
                        and other educational details may
                        change from time to time.
                    </p>
                    <p className="mt-3">
                        Participation in a course does not
                        guarantee employment, income,
                        certification, examination results,
                        or any particular professional
                        outcome.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        7. Applications and Information
                    </h2>
                    <p className="mt-3">
                        When submitting an application,
                        enrollment information, documents,
                        or other records, you are
                        responsible for ensuring that the
                        information is accurate and that you
                        are authorized to provide it.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        8. Intellectual Property
                    </h2>
                    <p className="mt-3">
                        Unless otherwise stated, the
                        content, branding, logos, software,
                        design, text, graphics, and other
                        materials provided through our
                        services belong to or are licensed
                        to The Earn Way Youth Development
                        Resource.
                    </p>
                    <p className="mt-3">
                        You may not reproduce, redistribute,
                        modify, sell, or commercially
                        exploit our materials without
                        appropriate authorization.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        9. Third-Party Services
                    </h2>
                    <p className="mt-3">
                        Our platform may use third-party
                        services for authentication,
                        hosting, storage, media processing,
                        communications, or other technical
                        functionality. Your use of such
                        functionality may also be subject to
                        the applicable terms of those
                        providers.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        10. Service Availability
                    </h2>
                    <p className="mt-3">
                        We aim to provide reliable services
                        but do not guarantee that the
                        platform will always be available,
                        uninterrupted, or free from errors.
                        Services may occasionally be
                        modified, suspended, or unavailable
                        due to maintenance, security,
                        technical issues, or other
                        operational reasons.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        11. Account Suspension
                    </h2>
                    <p className="mt-3">
                        We may suspend or terminate access
                        when reasonably necessary to protect
                        our users, organizations, services,
                        or systems, including in cases of
                        misuse, unauthorized access,
                        security concerns, or violation of
                        these terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        12. Changes to These Terms
                    </h2>
                    <p className="mt-3">
                        We may update these Terms of Service
                        from time to time. Updated terms
                        will be published on this page with
                        a revised last-updated date.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-foreground">
                        13. Contact
                    </h2>
                    <p className="mt-3">
                        If you have questions about these
                        Terms of Service, please contact The
                        Earn Way Youth Development Resource
                        through the contact information
                        provided on our website.
                    </p>
                </section>
            </div>
        </main>
    )
}
