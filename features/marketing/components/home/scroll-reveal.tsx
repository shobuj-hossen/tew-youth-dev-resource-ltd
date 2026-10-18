"use client"

import {
    ReactNode,
    useEffect,
    useRef,
    useState,
} from "react"

type ScrollRevealProps = {
    children: ReactNode
    delay?: number
}

export function ScrollReveal({
    children,
    delay = 0,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = ref.current

        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.1,
            },
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-500 ${
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
            }`}
        >
            {children}
        </div>
    )
}
