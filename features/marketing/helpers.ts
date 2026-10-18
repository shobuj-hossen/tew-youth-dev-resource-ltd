import {
    DISTRICTS,
    DIVISIONS,
    UPAZILAS,
} from "@/constants/bd-locations"

export function getDivisionById(id: string) {
    return DIVISIONS.find((d) => d.id === id)?.name
}
export function getDistrictById(id: string) {
    return DISTRICTS.find((d) => d.id === id)?.name
}
export function getUpazilaById(id: string) {
    return UPAZILAS.find((u) => u.id === id)?.name
}
