"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentValidationSchemas = exports.assignmentValidation = void 0;
const zod_1 = require("zod");
// Assuming you have an AssignmentType enum
var AssignmentType;
(function (AssignmentType) {
})(AssignmentType || (AssignmentType = {}));
// Add your assignment types here
// Example:
// REVIEW = 'review',
// APPROVAL = 'approval',
// PROCESSING = 'processing'
// Zod schemas
const assignmentValidationSchemas = {
    assignApplications: {
        body: zod_1.z.object({
            officerId: zod_1.z
                .number({
                required_error: 'Officer ID is required',
                invalid_type_error: 'Officer ID must be a number',
            })
                .int()
                .positive('Officer ID must be a positive integer'),
            assignmentType: zod_1.z.nativeEnum(AssignmentType, {
                errorMap: () => ({ message: 'Invalid assignment type' }),
            }),
            count: zod_1.z
                .number({
                required_error: 'Count is required',
                invalid_type_error: 'Count must be a number',
            })
                .int()
                .min(1, 'Count must be at least 1')
                .max(100, 'Count must not exceed 100'),
            targetId: zod_1.z.number().int().positive('Target ID must be a positive integer').optional(),
            academicSessionId: zod_1.z
                .number()
                .int()
                .positive('Academic session ID must be a positive integer')
                .optional(),
        }),
    },
    getOfficerAssignments: {
        params: zod_1.z.object({
            officerId: zod_1.z
                .string()
                .transform(val => parseInt(val))
                .refine(val => !isNaN(val) && val > 0, {
                message: 'Officer ID must be a valid positive number',
            }),
        }),
        query: zod_1.z.object({
            page: zod_1.z
                .string()
                .transform(val => parseInt(val))
                .refine(val => !isNaN(val) && val >= 1, {
                message: 'Page must be a positive integer',
            })
                .optional(),
            limit: zod_1.z
                .string()
                .transform(val => parseInt(val))
                .refine(val => !isNaN(val) && val >= 1 && val <= 100, {
                message: 'Limit must be between 1 and 100',
            })
                .optional(),
        }),
    },
    reassignApplication: {
        params: zod_1.z.object({
            applicationId: zod_1.z
                .string()
                .transform(val => parseInt(val))
                .refine(val => !isNaN(val) && val > 0, {
                message: 'Application ID must be a valid positive number',
            }),
        }),
        body: zod_1.z.object({
            newOfficerId: zod_1.z
                .number({
                required_error: 'New officer ID is required',
                invalid_type_error: 'New officer ID must be a number',
            })
                .int()
                .positive('New officer ID must be a positive integer'),
            reason: zod_1.z
                .string({
                required_error: 'Reason is required',
            })
                .min(10, 'Reason must be at least 10 characters')
                .max(500, 'Reason must not exceed 500 characters'),
        }),
    },
};
exports.assignmentValidationSchemas = assignmentValidationSchemas;
// Validation middleware factory
const createValidationMiddleware = (schema, source) => {
    return (req, res, next) => {
        try {
            const result = schema.safeParse(req[source]);
            if (!result.success) {
                const errors = result.error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors,
                });
            }
            // Replace the original data with parsed/transformed data
            req[source] = result.data;
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Internal validation error',
            });
        }
    };
};
// Combined validation middleware for routes with multiple validation sources
const createCombinedValidationMiddleware = (schemas) => {
    return (req, res, next) => {
        const errors = [];
        // Validate each source
        Object.entries(schemas).forEach(([source, schema]) => {
            const result = schema.safeParse(req[source]);
            if (!result.success) {
                const sourceErrors = result.error.errors.map(err => ({
                    field: `${source}.${err.path.join('.')}`,
                    message: err.message,
                }));
                errors.push(...sourceErrors);
            }
            else {
                // Replace with parsed/transformed data
                ;
                req[source] = result.data;
            }
        });
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors,
            });
        }
        next();
    };
};
// Export validation middleware
exports.assignmentValidation = {
    assignApplications: createValidationMiddleware(assignmentValidationSchemas.assignApplications.body, 'body'),
    getOfficerAssignments: createCombinedValidationMiddleware({
        params: assignmentValidationSchemas.getOfficerAssignments.params,
        query: assignmentValidationSchemas.getOfficerAssignments.query,
    }),
    reassignApplication: createCombinedValidationMiddleware({
        params: assignmentValidationSchemas.reassignApplication.params,
        body: assignmentValidationSchemas.reassignApplication.body,
    }),
};
