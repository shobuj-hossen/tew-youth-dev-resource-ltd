import { Suspense } from "react"
import { AboutUs } from "../components/home/about-us"
import { Courses } from "../components/home/courses"
import { Hero } from "../components/home/hero"
import { Features } from "../components/home/features"
import { FAQ } from "../components/home/faq"
import { ContactUs } from "../components/home/contact-us"

export function HomePage() {
    return (
        <div>
            <Hero />
            <Suspense>
                <Courses />
            </Suspense>
            <AboutUs />
            <Features />
            <FAQ />
            <ContactUs />
        </div>
    )
}
