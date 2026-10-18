export function capitalize(str: string): string {
    if (!str) return str
    return str[0].toUpperCase() + str.slice(1)
}

export async function wait(milliseconds?: number) {
    await new Promise((res) =>
        setTimeout(res, milliseconds || 1000),
    )
}

export function generatePassword(): string {
    const letters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"

    let password = ""

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(
            Math.random() * letters.length,
        )
        password += letters[randomIndex]
    }

    const totalLength = Math.floor(Math.random() * 3) + 8
    const remainingLength = totalLength - 6

    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(
            Math.random() * numbers.length,
        )
        password += numbers[randomIndex]
    }

    return password
}
