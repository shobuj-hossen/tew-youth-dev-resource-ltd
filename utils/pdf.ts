export const fetchImageAsDataURL = async (
    imageUrl: string,
): Promise<string> => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = () =>
            resolve(reader.result as string)
        reader.readAsDataURL(blob)
    })
}
