"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = exports.ValidationError = exports.InternalServerError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.PaymentError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, code, statusCode, details) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        // Maintain proper stack trace
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        return {
            error: {
                message: this.message,
                code: this.code,
                ...(this.details && { details: this.details }),
            },
        };
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = 'Invalid request', code = 'BAD_REQUEST', details) {
        super(message, code, 400, details);
    }
}
exports.BadRequestError = BadRequestError;
class PaymentError extends AppError {
    constructor(message, code = 'PAYMENT_ERROR', statusCode = 400, details) {
        super(message, code, statusCode, details);
        this.isOperational = true;
    }
}
exports.PaymentError = PaymentError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', code = 'UNAUTHORIZED', details) {
        super(message, code, 401, details);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', code = 'FORBIDDEN', details) {
        super(message, code, 403, details);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found', code = 'NOT_FOUND', details) {
        super(message, code, 404, details);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'Conflict', code = 'CONFLICT', details) {
        super(message, code, 409, details);
    }
}
exports.ConflictError = ConflictError;
class InternalServerError extends AppError {
    constructor(message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR', details) {
        super(message, code, 500, details);
    }
}
exports.InternalServerError = InternalServerError;
class ValidationError extends AppError {
    constructor(errors, message = 'Validation failed', code = 'VALIDATION_ERROR') {
        super(message, code, 422, errors);
    }
}
exports.ValidationError = ValidationError;
class DatabaseError extends AppError {
    constructor(message, details) {
        super(message, 'DATABASE_ERROR', 500, details);
    }
}
exports.DatabaseError = DatabaseError;
