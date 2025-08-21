"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = exports.assertUser = exports.verifyPasswordResetTokenMiddleware = exports.verifyEmailTokenMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin")); // Assuming User model and UserRole enum
// Import your custom error classes
const TokenService_1 = require("../services/TokenService");
const errors_1 = require("../utils/errors"); // Adjust path as needed
const logger_1 = __importDefault(require("../utils/logger"));
const verificationService = new TokenService_1.TokenService(process.env.JWT_SECRET || 'udorakpuenyi');
// Main authentication middleware for login tokens
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.UnauthorizedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        console.log('access token', token);
        const { decoded } = verificationService.verifyToken(token, 'access');
        console.log('DECODED', decoded);
        const user = await Admin_1.default.findByPk(decoded.id, {
            attributes: { exclude: ['password'] },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('User not found');
        }
        // Check if email is verified
        if (!user.isEmailVerified) {
            throw new errors_1.ForbiddenError('Please verify your email address');
        }
        req.user = user;
        logger_1.default.info(`Authenticated user: ${user.email} (ID: ${user.id})`);
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            logger_1.default.warn(`Token expired for user attempt`);
            return next(new errors_1.UnauthorizedError('Token expired'));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            logger_1.default.warn(`Invalid token attempt`);
            return next(new errors_1.UnauthorizedError('Invalid token'));
        }
        // If it's already one of our custom errors, pass it along
        if (error instanceof errors_1.UnauthorizedError || error instanceof errors_1.ForbiddenError) {
            return next(error);
        }
        logger_1.default.error('Authentication error:', error);
        return next(error);
    }
};
exports.authMiddleware = authMiddleware;
// Middleware for email verification tokens
const verifyEmailTokenMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new errors_1.BadRequestError('Email verification token is required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.EMAIL_VERIFICATION_SECRET || 'email-verification-secret');
        if (decoded.type !== 'email_verification') {
            throw new errors_1.BadRequestError('Invalid token type');
        }
        const user = await Admin_1.default.findByPk(decoded.userId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        // Verify the verification code matches
        if (user.verificationToken !== decoded.verificationCode) {
            throw new errors_1.BadRequestError('Invalid verification token');
        }
        // Attach user and verification code to request
        req.user = user;
        req.verificationCode = decoded.verificationCode;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new errors_1.BadRequestError('Email verification token expired'));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new errors_1.BadRequestError('Invalid email verification token'));
        }
        // If it's already one of our custom errors, pass it along
        if (error instanceof errors_1.BadRequestError || error instanceof errors_1.NotFoundError) {
            return next(error);
        }
        logger_1.default.error('Email verification token error:', error);
        return next(error);
    }
};
exports.verifyEmailTokenMiddleware = verifyEmailTokenMiddleware;
// Middleware for password reset tokens
const verifyPasswordResetTokenMiddleware = async (req, res, next) => {
    try {
        const { token } = req.body;
        if (!token) {
            throw new errors_1.BadRequestError('Password reset token is required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.PASSWORD_RESET_SECRET || 'password-reset-secret');
        if (decoded.type !== 'password_reset') {
            throw new errors_1.BadRequestError('Invalid token type');
        }
        const user = await Admin_1.default.findByPk(decoded.userId);
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        // Verify the reset token matches
        if (user.passwordResetToken !== decoded.resetToken) {
            throw new errors_1.BadRequestError('Invalid reset token');
        }
        // Check if token is expired (using verificationTokenExpiry for reset token expiry)
        // Attach user and reset token to request
        req.user = user;
        req.resetToken = decoded.resetToken;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new errors_1.BadRequestError('Password reset token expired'));
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return next(new errors_1.BadRequestError('Invalid password reset token'));
        }
        // If it's already one of our custom errors, pass it along
        if (error instanceof errors_1.BadRequestError || error instanceof errors_1.NotFoundError) {
            return next(error);
        }
        logger_1.default.error('Password reset token error:', error);
        return next(error);
    }
};
exports.verifyPasswordResetTokenMiddleware = verifyPasswordResetTokenMiddleware;
// Type guard helper for authenticated routes
const assertUser = (req) => {
    if (!req.user) {
        throw new errors_1.UnauthorizedError('User not authenticated');
    }
};
exports.assertUser = assertUser;
class TokenMiddleware {
    constructor(tokenService) {
        this.tokenService = tokenService;
    }
    /**
     * Express middleware for token verification
     */
    verifyAccessToken() {
        return (req, res, next) => {
            const authHeader = req.headers.authorization;
            try {
                const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
                if (!token) {
                    throw new errors_1.BadRequestError('No access Token provided');
                }
                const result = this.tokenService.verifyToken(token, 'access');
                req.user = result.decoded;
                next();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.TokenMiddleware = TokenMiddleware;
exports.default = TokenService_1.TokenService;
