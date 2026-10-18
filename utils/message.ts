export async function message(message?: string) {
    const modified = message || "success"
    return { message: modified }
}
