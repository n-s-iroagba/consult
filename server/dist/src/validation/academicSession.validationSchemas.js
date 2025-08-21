"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.academicSessionUpdateSchema = exports.academicSessionCreationSchema = void 0;
const zod_1 = require("zod");
const academicSessionBaseSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Session name must be at least 3 characters long')
        .max(100, 'Session name must be less than 100 characters')
        .regex(/^[a-zA-Z0-9\s\-\/]+$/, 'Session name can only contain letters, numbers, spaces, hyphens, and forward slashes'),
    applicationStartDate: zod_1.z.string().datetime('Invalid application start date format').or(zod_1.z.date()),
    applicationEndDate: zod_1.z.string().datetime('Invalid application end date format').or(zod_1.z.date()),
});
exports.academicSessionCreationSchema = academicSessionBaseSchema.refine(data => {
    const startDate = new Date(data.applicationStartDate);
    const endDate = new Date(data.applicationEndDate);
    return endDate > startDate;
}, {
    message: 'Application end date must be after start date',
    path: ['applicationEndDate'],
});
exports.academicSessionUpdateSchema = academicSessionBaseSchema.partial();
