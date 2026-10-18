import { getCourses } from "./queries";

export type Course = Awaited<ReturnType<typeof getCourses>>[number];