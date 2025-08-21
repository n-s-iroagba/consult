"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacultiesQuerySchema = exports.idParamSchema = exports.updateFacultySchema = exports.createFacultySchema = void 0;
const zod_1 = require("zod");
exports.createFacultySchema = zod_1.z.array(zod_1.z.object({
    name: zod_1.z.string().min(2, 'Faculty name must be at least 2 characters long'),
}));
exports.updateFacultySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Faculty name must be at least 2 characters long'),
});
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, 'ID must be a number'),
});
exports.getFacultiesQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).optional(),
    includeDepartments: zod_1.z
        .string()
        .transform(v => v === 'true')
        .optional(),
});
