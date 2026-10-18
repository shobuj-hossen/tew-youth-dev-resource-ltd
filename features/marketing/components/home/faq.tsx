"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const faqs = [
    {
        question:
            "How can I apply to open a training branch?",
        answer: "You can submit a branch application through our platform. After reviewing the required information and documents, our team will evaluate the application and communicate the next steps.",
    },
    {
        question: "Who can apply for a training branch?",
        answer: "Individuals or organizations interested in providing structured computer and professional skills training in their community can apply, subject to our requirements and approval process.",
    },
    {
        question: "What courses are available?",
        answer: "We offer a range of practical computer and professional skill courses. Available courses, durations, mediums, and other information are displayed in our course section.",
    },
    {
        question: "How are examinations conducted?",
        answer: "Students enrolled through authorized branches can participate in examinations according to the applicable course and examination requirements. Branches are responsible for following the provided examination process.",
    },
    {
        question: "Will students receive certificates?",
        answer: "Students who successfully complete the applicable course and fulfill the required academic criteria can receive an official certificate issued through the organization.",
    },
    {
        question:
            "Can a certificate or result be verified?",
        answer: "Yes. Our verification system allows relevant academic credentials and results to be checked using the information provided on the certificate or result record.",
    },
    {
        question: "Can I enroll directly as a student?",
        answer: "Course enrollment is handled through our authorized training branches. You can contact a branch offering your preferred course for enrollment information and availability.",
    },
    {
        question: "How can I contact your organization?",
        answer: "You can use the contact information provided on our website to reach our team. We will be happy to help with questions about courses, branches, examinations, certificates, and verification.",
    },
]

export function FAQ() {
    return (
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-px w-7 bg-primary" />

                    <span className="text-primary">
                        Frequently asked questions
                    </span>
                    <span className="h-px w-7 bg-primary" />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Questions, answered.
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Find answers to some of the most common
                    questions about our branches, courses,
                    examinations, certificates, and
                    verification process.
                </p>
            </div>

            <div className="mt-10 overflow-hidden rounded-3xl border bg-card sm:mt-12">
                <ScrollReveal>
                    <Accordion className="w-full px-5 sm:px-8">
                        {faqs.map((faq, index) => (
                            <ScrollReveal
                                key={faq.question}
                                delay={index * 80}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border-b last:border-b-0"
                                >
                                    <AccordionTrigger className="py-5 text-left text-sm font-medium hover:no-underline sm:py-6 sm:text-base">
                                        {faq.question}
                                    </AccordionTrigger>

                                    <AccordionContent className="max-w-3xl pb-5 text-sm leading-6 text-muted-foreground sm:pb-6">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </ScrollReveal>
                        ))}
                    </Accordion>
                </ScrollReveal>
            </div>

            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Still have a question?{" "}
                    <span className="font-medium text-foreground">
                        We are here to help.
                    </span>
                </p>
            </div>
        </section>
    )
}
