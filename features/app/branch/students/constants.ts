export const BLOOD_GROUPS = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
] as const
export const GENDER = ["Male", "Female", "Other"] as const
export const ENROLLMENT_STATUS = [
    "active",
    "completed",
    "cancelled",
] as const

export const COURSE_DURATION_OPTIONS = [
    {
        label: "3 Months",
        value: "3_months",
    },
    {
        label: "6 Months",
        value: "6_months",
    },
    {
        label: "1 Year",
        value: "1_year",
    },
    {
        label: "2 Years",
        value: "2_years",
    },
    {
        label: "3 Years",
        value: "3_years",
    },
    {
        label: "4 Years",
        value: "4_years",
    },
] as const

export const MEDIUM_OPTIONS = [
    {
        label: "Bangla",
        value: "bangla",
    },
    {
        label: "English",
        value: "english",
    },
    {
        label: "Bangla & English",
        value: "bangla-english",
    },
] as const

// for add student form utils

export type CourseDuration =
    (typeof COURSE_DURATION_OPTIONS)[number]["value"]

type CourseRangeOption = {
    label: string
    value: string
}

const DURATION_MONTHS: Record<CourseDuration, number> = {
    "3_months": 3,
    "6_months": 6,
    "1_year": 12,
    "2_years": 24,
    "3_years": 36,
    "4_years": 48,
}

const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export function getDuration(duration: CourseDuration) {
    return COURSE_DURATION_OPTIONS.find(
        (v) => v.value === duration,
    )?.label!
}

export function getCourseRangeOptions(
    duration: CourseDuration,
    currentYear = new Date().getFullYear(),
): CourseRangeOption[] {
    const durationMonths = DURATION_MONTHS[duration]

    const firstYear = currentYear - 3
    const lastYear = currentYear + 1

    const options: CourseRangeOption[] = []

    if (durationMonths < 12) {
        for (
            let year = firstYear;
            year <= lastYear;
            year++
        ) {
            for (
                let startMonth = 0;
                startMonth < 12;
                startMonth += durationMonths
            ) {
                const endMonth =
                    startMonth + durationMonths - 1

                options.push({
                    label: `${MONTH_NAMES[startMonth]} ${year} to ${
                        MONTH_NAMES[endMonth]
                    } ${year}`,
                    value: `${year}-${String(
                        startMonth + 1,
                    ).padStart(2, "0")}_${year}-${String(
                        endMonth + 1,
                    ).padStart(2, "0")}`,
                })
            }
        }

        return options
    }

    const durationYears = durationMonths / 12

    for (
        let startYear = firstYear;
        startYear <= lastYear;
        startYear++
    ) {
        const endYear = startYear + durationYears - 1

        options.push({
            label: `Jan ${startYear} to Dec ${endYear}`,
            value: `${startYear}-01_${endYear}-12`,
        })
    }

    return options
}

export function getCourseRangeLabel(
    value: string,
    duration: CourseDuration,
    currentYear = new Date().getFullYear(),
) {
    return (
        getCourseRangeOptions(duration, currentYear).find(
            (option) => option.value === value,
        )?.label ?? value
    )
}

export const ACADEMIC_LEVEL_OPTIONS = [
    { label: "JSC / JDC / Equivalent", value: "jsc-jdc" },
    {
        label: "SSC / Dakhil / Equivalent",
        value: "ssc-dakhil",
    },
    { label: "HSC / Alim / Equivalent", value: "hsc-alim" },
    { label: "Diploma / Technical", value: "diploma" },
    {
        label: "Bachelor / Honors / Equivalent",
        value: "bachelor",
    },
    { label: "Master / Equivalent", value: "master" },
    { label: "M.Phil", value: "mphil" },
    { label: "Ph.D.", value: "phd" },
    { label: "Other", value: "other" },
]

export const INSTITUTION_OPTIONS = [
    // General Education Boards
    {
        label: "Barishal Education Board",
        value: "barishal-board",
    },
    {
        label: "Chattogram Education Board",
        value: "chattogram-board",
    },
    {
        label: "Cumilla Education Board",
        value: "cumilla-board",
    },
    {
        label: "Dhaka Education Board",
        value: "dhaka-board",
    },
    {
        label: "Dinajpur Education Board",
        value: "dinajpur-board",
    },
    {
        label: "Jashore Education Board",
        value: "jashore-board",
    },
    {
        label: "Mymensingh Education Board",
        value: "mymensingh-board",
    },
    {
        label: "Rajshahi Education Board",
        value: "rajshahi-board",
    },
    {
        label: "Sylhet Education Board",
        value: "sylhet-board",
    },

    // Specialized Boards
    {
        label: "Bangladesh Madrasah Education Board (BMEB)",
        value: "madrasah-board",
    },
    {
        label: "Bangladesh Technical Education Board (BTEB)",
        value: "technical-board",
    },

    // English Medium / Foreign Boards
    {
        label: "Cambridge International (CAIE)",
        value: "cambridge",
    },
    { label: "Edexcel / Pearson", value: "edexcel" },
    {
        label: "International Baccalaureate (IB)",
        value: "ib",
    },

    // Higher Education Systems / Autonomous Bodies
    {
        label: "National University (NU)",
        value: "national-university",
    },
    {
        label: "Islamic Arabic University (IAU)",
        value: "islamic-arabic-university",
    },
    {
        label: "Open University (BOU)",
        value: "open-university",
    },
    {
        label: "Public University",
        value: "public-university",
    },
    {
        label: "Private University",
        value: "private-university",
    },
    {
        label: "Medical / Dental College",
        value: "medical-dental",
    },
    {
        label: "Engineering University / College",
        value: "engineering-college",
    },

    // Fallback
    {
        label: "Other / Foreign Institution",
        value: "other",
    },
]

export const feeField = {
    "3_months": "threeMonthsFee",
    "6_months": "sixMonthsFee",
    "1_year": "oneYearFee",
    "2_years": "twoYearsFee",
    "3_years": "threeYearsFee",
    "4_years": "fourYearsFee",
} as const
