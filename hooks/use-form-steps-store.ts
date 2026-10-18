// stores/use-onboarding-store.ts
import { create } from "zustand"

type FormStepsStore = {
    currentStep: number
    setStep: (step: number) => void
    nextStep: (
        stepId?: string,
        routerPush?: (url: string) => void,
    ) => void
    previousStep: () => void
}

export const useFormStepsStore = create<FormStepsStore>(
    (set) => ({
        currentStep: 0,
        setStep: (step) => set({ currentStep: step }),

        nextStep: (stepId, routerPush) =>
            set((state) => {
                if (stepId && routerPush) {
                    routerPush(`#${stepId}`)
                }

                return {
                    currentStep: state.currentStep + 1,
                }
            }),

        previousStep: () =>
            set((state) => ({
                currentStep: Math.max(
                    0,
                    state.currentStep - 1,
                ),
            })),
    }),
)
