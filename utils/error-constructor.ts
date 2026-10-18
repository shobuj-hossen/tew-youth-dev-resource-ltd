export class ValidationError extends Error {
    constructor(message: string = "Invalid Data") {
        super(message)
        this.name = "ValidationError"
    }
}
export class NotFoundError extends Error {
    constructor(message: string = "Not Found") {
        super(message)
        this.name = "NotFoundError"
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string = "Unauthorized") {
        super(message)
        this.name = "UnauthorizedError"
    }
}

export class PermissionDeniedError extends Error {
    constructor(message: string = "Permission Denied") {
        super(message)
        this.name = "PermissionDeniedError"
    }
}

export class InternalServerError extends Error {
    constructor(message: string = "Internal Server Error") {
        super(message)
        this.name = "InternalServerError"
    }
}
