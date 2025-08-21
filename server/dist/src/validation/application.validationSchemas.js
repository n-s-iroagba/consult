"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationQuerySchemaPreprocess = exports.idParamSchemaFixed = exports.paginationQuerySchemaFixed = exports.uuidParamSchema = exports.idParamSchema = exports.applicationStatusUpdateSchema = exports.biodataUpdateSchema = exports.commentUpdateSchema = exports.commentCreationSchema = exports.programSpecificRequirementUpdateSchema = exports.programSpecificRequirementCreationSchema = exports.sscRequirementUpdateSchema = exports.sscRequirementCreationSchema = exports.sscSubjectMinimumGradeSchema = exports.programUpdateSchema = exports.programCreationSchema = exports.departmentUpdateSchema = exports.departmentCreationSchema = void 0;
// validation/schemas.validation.ts
const zod_1 = require("zod");
exports.departmentCreationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, 'Department name must be at least 2 characters long')
        .max(100, 'Department name must be less than 100 characters')
        .regex(/^[a-zA-Z\s&\-']+$/, 'Department name can only contain letters, spaces, ampersands, hyphens, and apostrophes'),
    code: zod_1.z
        .string()
        .min(2, 'Department code must be at least 2 characters long')
        .max(10, 'Department code must be less than 10 characters')
        .regex(/^[A-Z0-9]+$/, 'Department code must be uppercase letters and numbers only'),
    description: zod_1.z.string().max(500, 'Description must be less than 500 characters').optional(),
    facultyId: zod_1.z
        .number()
        .int('Faculty ID must be an integer')
        .positive('Faculty ID must be positive'),
});
exports.departmentUpdateSchema = exports.departmentCreationSchema.partial();
// ========== PROGRAM VALIDATION ==========
const programLevelEnum = zod_1.z.enum(['OND', 'HND', 'Certificate'], {
    errorMap: () => ({ message: 'Program level must be OND, HND, or Certificate' }),
});
const durationTypeEnum = zod_1.z.enum(['WEEK', 'MONTH', 'YEAR'], {
    errorMap: () => ({ message: 'Duration type must be WEEK, MONTH, or YEAR' }),
});
exports.programCreationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Program name must be at least 3 characters long')
        .max(150, 'Program name must be less than 150 characters'),
    awardType: zod_1.z
        .string()
        .min(2, 'Award type must be at least 2 characters long')
        .max(50, 'Award type must be less than 50 characters'),
    durationType: durationTypeEnum,
    duration: zod_1.z
        .number()
        .int('Duration must be an integer')
        .positive('Duration must be positive')
        .max(10, 'Duration cannot exceed 10 units'),
    applicationFeeInNaira: zod_1.z
        .number()
        .nonnegative('Application fee cannot be negative')
        .max(1000000, 'Application fee cannot exceed ₦1,000,000'),
    acceptanceFeeInNaira: zod_1.z
        .number()
        .nonnegative('Acceptance fee cannot be negative')
        .max(10000000, 'Acceptance fee cannot exceed ₦10,000,000'),
    description: zod_1.z.string().max(1000, 'Description must be less than 1000 characters').optional(),
    isUsingPreexistingSSCRequirements: zod_1.z.boolean(),
    isUsingPreexistingProgramSpecificRequirements: zod_1.z.boolean(),
    sscRequirementId: zod_1.z
        .number()
        .int('SSC requirement ID must be an integer')
        .nonnegative('SSC requirement ID cannot be negative'),
    programSpecificRequirementsId: zod_1.z
        .number()
        .int('Program specific requirements ID must be an integer')
        .nonnegative('Program specific requirements ID cannot be negative'),
});
exports.programUpdateSchema = exports.programCreationSchema.partial();
// ========== SSC REQUIREMENT VALIDATION ==========
const gradeEnum = zod_1.z.enum(['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'], {
    errorMap: () => ({ message: 'Grade must be a valid SSC grade (A1-F9)' }),
});
exports.sscSubjectMinimumGradeSchema = zod_1.z.object({
    subjectId: zod_1.z
        .number()
        .int('Subject ID must be an integer')
        .positive('Subject ID must be positive'),
    minimumGrade: gradeEnum,
});
exports.sscRequirementCreationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'SSC requirement name must be at least 3 characters long')
        .max(100, 'SSC requirement name must be less than 100 characters'),
    description: zod_1.z.string().max(500, 'Description must be less than 500 characters').optional(),
    minimumNumberOfSittings: zod_1.z
        .number()
        .int('Minimum number of sittings must be an integer')
        .min(1, 'Minimum number of sittings must be at least 1')
        .max(3, 'Minimum number of sittings cannot exceed 3'),
    minimumNumberOfCredits: zod_1.z
        .number()
        .int('Minimum number of credits must be an integer')
        .min(1, 'Minimum number of credits must be at least 1')
        .max(15, 'Minimum number of credits cannot exceed 15'),
    subjectMinimumGrades: zod_1.z
        .array(exports.sscSubjectMinimumGradeSchema)
        .min(1, 'At least one subject requirement is required')
        .max(15, 'Cannot have more than 15 subject requirements'),
});
exports.sscRequirementUpdateSchema = exports.sscRequirementCreationSchema.partial();
// ========== PROGRAM SPECIFIC REQUIREMENT VALIDATION ==========
exports.programSpecificRequirementCreationSchema = zod_1.z.object({
    qualificationType: zod_1.z
        .string()
        .min(2, 'Qualification type must be at least 2 characters long')
        .max(100, 'Qualification type must be less than 100 characters'),
    minimumGrade: zod_1.z
        .string()
        .min(1, 'Minimum grade is required')
        .max(10, 'Minimum grade must be less than 10 characters')
        .regex(/^[A-F][0-9]?$|^[0-9](\.[0-9]{1,2})?$|^(PASS|MERIT|DISTINCTION|CREDIT)$/i, 'Invalid grade format'),
});
exports.programSpecificRequirementUpdateSchema = exports.programSpecificRequirementCreationSchema.partial();
// ========== COMMENT VALIDATION ==========
const commentTypeEnum = zod_1.z.enum(['GENERAL', 'BIODATA', 'QUALIFICATION', 'DECISION'], {
    errorMap: () => ({
        message: 'Comment type must be GENERAL, BIODATA, QUALIFICATION, or DECISION',
    }),
});
exports.commentCreationSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(1, 'Comment content is required')
        .max(2000, 'Comment content must be less than 2000 characters'),
    type: commentTypeEnum,
    applicationId: zod_1.z.string().uuid('Application ID must be a valid UUID').optional(),
});
exports.commentUpdateSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(1, 'Comment content is required')
        .max(2000, 'Comment content must be less than 2000 characters')
        .optional(),
    type: commentTypeEnum.optional(),
});
// ========== BIODATA VALIDATION ==========
const genderEnum = zod_1.z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: 'Gender must be MALE or FEMALE' }),
});
const maritalStatusEnum = zod_1.z.enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'], {
    errorMap: () => ({ message: 'Marital status must be SINGLE, MARRIED, DIVORCED, or WIDOWED' }),
});
const biodataCreationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(2, 'First name must be at least 2 characters long')
        .max(50, 'First name must be less than 50 characters')
        .regex(/^[a-zA-Z\s\-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    middleName: zod_1.z
        .string()
        .max(50, 'Middle name must be less than 50 characters')
        .regex(/^[a-zA-Z\s\-']*$/, 'Middle name can only contain letters, spaces, hyphens, and apostrophes')
        .optional(),
    surname: zod_1.z
        .string()
        .min(2, 'Surname must be at least 2 characters long')
        .max(50, 'Surname must be less than 50 characters')
        .regex(/^[a-zA-Z\s\-']+$/, 'Surname can only contain letters, spaces, hyphens, and apostrophes'),
    gender: genderEnum,
    dateOfBirth: zod_1.z
        .string()
        .datetime('Invalid date of birth format')
        .or(zod_1.z.date())
        .refine(data => {
        const birthDate = new Date(data);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 16 && age <= 65;
    }, {
        message: 'Age must be between 16 and 65 years',
    }),
    maritalStatus: maritalStatusEnum,
    phoneNumber: zod_1.z
        .string()
        .regex(/^(\+234|0)[789][01]\d{8}$/, 'Invalid Nigerian phone number format'),
    emailAddress: zod_1.z.string().email('Invalid email address format'),
    homeAddress: zod_1.z
        .string()
        .min(10, 'Home address must be at least 10 characters long')
        .max(200, 'Home address must be less than 200 characters'),
    nationality: zod_1.z
        .string()
        .min(2, 'Nationality must be at least 2 characters long')
        .max(50, 'Nationality must be less than 50 characters'),
    stateOfOrigin: zod_1.z
        .string()
        .min(2, 'State of origin must be at least 2 characters long')
        .max(50, 'State of origin must be less than 50 characters'),
    lga: zod_1.z
        .string()
        .min(2, 'LGA must be at least 2 characters long')
        .max(50, 'LGA must be less than 50 characters'),
    homeTown: zod_1.z
        .string()
        .min(2, 'Home town must be at least 2 characters long')
        .max(50, 'Home town must be less than 50 characters'),
    nextOfKinFullName: zod_1.z
        .string()
        .min(2, 'Next of kin full name must be at least 2 characters long')
        .max(100, 'Next of kin full name must be less than 100 characters')
        .regex(/^[a-zA-Z\s\-']+$/, 'Next of kin name can only contain letters, spaces, hyphens, and apostrophes'),
    nextOfKinPhoneNumber: zod_1.z
        .string()
        .regex(/^(\+234|0)[789][01]\d{8}$/, 'Invalid Nigerian phone number format'),
    relationshipWithNextOfKin: zod_1.z
        .string()
        .min(2, 'Relationship must be at least 2 characters long')
        .max(50, 'Relationship must be less than 50 characters'),
    nextOfKinAddress: zod_1.z
        .string()
        .min(10, 'Next of kin address must be at least 10 characters long')
        .max(200, 'Next of kin address must be less than 200 characters'),
});
exports.biodataUpdateSchema = biodataCreationSchema.partial();
// ========== APPLICATION STATUS VALIDATION ==========
const applicationStatusEnum = zod_1.z.enum(['PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'WAITLISTED'], {
    errorMap: () => ({
        message: 'Status must be PENDING, UNDER_REVIEW, APPROVED, REJECTED, or WAITLISTED',
    }),
});
exports.applicationStatusUpdateSchema = zod_1.z.object({
    status: applicationStatusEnum,
    comments: zod_1.z.string().max(1000, 'Comments must be less than 1000 characters').optional(),
});
// ========== PARAMETER VALIDATION ==========
exports.idParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .regex(/^\d+$/, 'ID must be a valid number')
        .transform(val => parseInt(val, 10)),
});
exports.uuidParamSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('ID must be a valid UUID'),
});
exports.paginationQuerySchemaFixed = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().max(100).optional(),
    sortBy: zod_1.z.string().max(50).optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.idParamSchemaFixed = zod_1.z.object({
    id: zod_1.z.coerce.number().positive(),
});
// Solution 3: Use preprocess for more control
exports.paginationQuerySchemaPreprocess = zod_1.z.preprocess((input) => ({
    ...input,
    page: input.page ? Math.max(1, parseInt(input.page, 10)) : 1,
    limit: input.limit ? Math.min(100, Math.max(1, parseInt(input.limit, 10))) : 10,
}), zod_1.z.object({
    page: zod_1.z.number().min(1).default(1),
    limit: zod_1.z.number().min(1).max(100).default(10),
    search: zod_1.z.string().max(100).optional(),
    sortBy: zod_1.z.string().max(50).optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
}));
