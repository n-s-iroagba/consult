"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProgramSchema = exports.bulkProgramSchema = exports.programSchema = void 0;
// src/validators/programValidator.ts
const zod_1 = require("zod");
exports.programSchema = zod_1.z.object({
    departmentId: zod_1.z.number(),
    name: zod_1.z.string().max(100),
    code: zod_1.z.string().max(100),
    level: zod_1.z.enum(['OND', 'HND', 'Certificate']),
    durationType: zod_1.z.enum(['WEEK', 'MONTH', 'YEAR']),
    duration: zod_1.z.number().min(1),
    applicationFeeInNaira: zod_1.z.number().nonnegative(),
    acceptanceFeeInNaira: zod_1.z.number().nonnegative(),
    description: zod_1.z.string().optional(),
});
exports.bulkProgramSchema = zod_1.z.array(exports.programSchema);
exports.updateProgramSchema = exports.programSchema.partial();
