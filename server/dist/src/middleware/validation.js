"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationErrorResponse = exports.asyncValidateBody = exports.validateAll = exports.validateQueryTyped = exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = result.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            const validationError = new errors_1.ValidationError(errors);
            next(validationError);
            return;
        }
        next();
    };
};
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);
        if (!result.success) {
            const errors = result.error.issues.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            const validationError = new errors_1.ValidationError(errors);
            next(validationError);
            return;
        }
        next();
    };
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.query);
            req.query = result; // Type assertion needed here
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.issues, // Changed from 'errors' to 'issues'
                });
            }
            next(error);
        }
    };
};
exports.validateQuery = validateQuery;
// Alternative: More type-safe version
const validateQueryTyped = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.query);
            req.validatedQuery = result;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.issues, // Changed from 'errors' to 'issues'
                });
            }
            next(error);
        }
    };
};
exports.validateQueryTyped = validateQueryTyped;
// Combined validation for common patterns
const validateAll = (schemas) => {
    return (req, res, next) => {
        const errors = [];
        // Validate body
        if (schemas.body) {
            const bodyResult = schemas.body.safeParse(req.body);
            if (!bodyResult.success) {
                errors.push(...bodyResult.error.issues.map(err => ({
                    field: `body.${err.path.join('.')}`,
                    message: err.message,
                })));
            }
        }
        // Validate params
        if (schemas.params) {
            const paramsResult = schemas.params.safeParse(req.params);
            if (!paramsResult.success) {
                errors.push(...paramsResult.error.issues.map(err => ({
                    field: `params.${err.path.join('.')}`,
                    message: err.message,
                })));
            }
        }
        // Validate query
        if (schemas.query) {
            const queryResult = schemas.query.safeParse(req.query);
            if (!queryResult.success) {
                errors.push(...queryResult.error.issues.map(err => ({
                    field: `query.${err.path.join('.')}`,
                    message: err.message,
                })));
            }
            else {
                req.query = queryResult.data;
            }
        }
        if (errors.length > 0) {
            const validationError = new errors_1.ValidationError(errors);
            next(validationError);
            return;
        }
        next();
    };
};
exports.validateAll = validateAll;
// Additional helper for handling async validation
const asyncValidateBody = (schema) => {
    return async (req, res, next) => {
        try {
            const result = await schema.parseAsync(req.body);
            req.body = result;
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errors = error.issues.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                const validationError = new errors_1.ValidationError(errors);
                next(validationError);
                return;
            }
            next(error);
        }
    };
};
exports.asyncValidateBody = asyncValidateBody;
// Helper for creating consistent error responses
const createValidationErrorResponse = (error) => {
    return {
        message: 'Validation error',
        errors: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
            code: issue.code,
        }))
    };
};
exports.createValidationErrorResponse = createValidationErrorResponse;
