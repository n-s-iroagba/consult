"use strict";
// services/verification.service.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
const codeHelper_1 = require("../utils/codeHelper");
const logger_1 = __importDefault(require("../utils/logger"));
const errors_1 = require("../utils/errors");
const config_1 = __importDefault(require("../config"));
class VerificationService {
    constructor(tokenService, userService, emailService, config) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.emailService = emailService;
        this.config = config;
    }
    async generateVerificationDetails(user) {
        try {
            const verificationToken = this.tokenService.generateEmailVerificationToken(user);
            const verificationCode = config_1.default.nodeEnv === 'production' ? codeHelper_1.CodeHelper.generateVerificationCode() : '123456';
            console.log('VVVV', verificationCode);
            await this.userService.updateUserVerification(user, verificationCode, verificationToken);
            //await this.emailService.sendVerificationEmail(user)
            logger_1.default.info('Verification details generated successfully', { userId: user.id });
            return { verificationToken, id: user.id };
        }
        catch (error) {
            logger_1.default.error('Error generating verification details', { userId: user.id, error });
            throw error;
        }
    }
    async regenerateVerificationCode(id, token) {
        try {
            const user = await this.userService.findUserById(id);
            if (user.verificationToken !== token)
                throw new errors_1.BadRequestError('Token does not match');
            const { verificationToken } = await this.generateVerificationDetails(user);
            //await this.emailService.sendVerificationEmail(user)
            logger_1.default.info('Verification code regenerated', { userId: user.id });
            return verificationToken;
        }
        catch (error) {
            logger_1.default.error('Error regenerating verification code', { error });
            throw error;
        }
    }
    validateVerificationCode(user, code) {
        console.log(user);
        if (user.verificationCode !== code) {
            logger_1.default.warn('Invalid verification code provided', { userId: user.id });
            throw new errors_1.ForbiddenError('Invalid verification code', 'INVALID_VERIFICATION_CODE');
        }
        logger_1.default.info('Verification code validated successfully', { userId: user.id });
    }
}
exports.VerificationService = VerificationService;
