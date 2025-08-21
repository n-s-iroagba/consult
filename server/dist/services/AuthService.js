"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
exports.createAuthService = createAuthService;
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../utils/logger"));
const AdminService_1 = require("./AdminService");
const EmailService_1 = require("./EmailService");
const PasswordService_1 = require("./PasswordService");
const TokenService_1 = require("./TokenService");
const VerificationService_1 = require("./VerificationService");
class AuthService {
    constructor(config) {
        this.config = config;
        this.tokenService = new TokenService_1.TokenService(config.jwtSecret);
        this.passwordService = new PasswordService_1.PasswordService();
        this.adminService = new AdminService_1.AdminService();
        this.emailService = new EmailService_1.EmailService(config.clientUrl);
        this.verificationService = new VerificationService_1.VerificationService(this.tokenService, this.adminService, this.emailService, config);
        logger_1.default.info('AuthService initialized successfully');
    }
    /**
     * Registers a new user and initiates email verification.
     * @param data - User sign-up data.
     * @param roles - Optional array of user roles.
     * @returns Sign-up response with verification token.
     */
    async signUp(data) {
        try {
            logger_1.default.info('Sign up process started', { email: data.email });
            const hashedPassword = await this.passwordService.hashPassword(data.password);
            const user = await this.adminService.createUser({
                ...data,
                password: hashedPassword,
            });
            const result = await this.verificationService.generateVerificationDetails(user);
            logger_1.default.info('Sign up completed successfully', { userId: user.id });
            return { result, user };
        }
        catch (error) {
            return this.handleAuthError('Sign up', { email: data.email }, error);
        }
    }
    /**
     * Logs a user in by validating credentials and returning tokens.
     * @param data - Login DTO containing email and password.
     * @returns LoginAuthServiceReturn or SignUpResponseDto for unverified users.
     */
    async login(data) {
        try {
            logger_1.default.info('Login attempt started', { email: data.email });
            const user = await this.adminService.findUserByEmail(data.email, true);
            console.log('PASSWORD', user?.password);
            await this.validatePassword(user, data.password);
            if (!user) {
                throw new errors_1.NotFoundError('user not found');
            }
            if (!user.isEmailVerified) {
                logger_1.default.warn('Login attempted by unverified user', { userId: user.id });
                const { verificationToken } = await this.verificationService.generateVerificationDetails(user);
                return { verificationToken };
            }
            const { accessToken, refreshToken } = this.generateTokenPair(user);
            logger_1.default.info('Login successful', { userId: user?.id });
            const returnUser = { ...user.get({ plain: true }) };
            user.refreshToken = refreshToken;
            await user.save();
            return { user: returnUser, accessToken, refreshToken };
        }
        catch (error) {
            return this.handleAuthError('Login', { email: data.email }, error);
        }
    }
    /**
     * Issues a new access token from a refresh token.
     * @param refreshToken - JWT refresh token.
     * @returns Object containing a new access token.
     */
    async refreshToken(refreshToken) {
        try {
            logger_1.default.info('Token refresh attempted');
            const { decoded } = this.tokenService.verifyToken(refreshToken, 'refresh');
            if (!decoded.id) {
                logger_1.default.warn('Invalid refresh token provided');
                throw new errors_1.BadRequestError('Invalid refresh token');
            }
            const user = await this.adminService.findUserById(decoded.id);
            const newAccessToken = this.tokenService.generateAccessToken(user);
            logger_1.default.info('Token refreshed successfully', { userId: user.id });
            return { accessToken: newAccessToken };
        }
        catch (error) {
            return this.handleAuthError('Token refresh', {}, error);
        }
    }
    /**
     * Verifies a user's email using a token and code.
     * @param data - DTO containing token and verification code.
     * @returns Auth tokens for the verified user.
     */
    async verifyEmail(data) {
        try {
            logger_1.default.info('Email verification started');
            const { decoded } = this.tokenService.verifyToken(data.verificationToken, 'email_verification');
            console.log(decoded);
            const userId = decoded.userId;
            if (!userId) {
                logger_1.default.warn('Invalid verification token provided');
                throw new errors_1.BadRequestError('Unsuitable token');
            }
            const user = await this.adminService.findUserById(userId);
            this.verificationService.validateVerificationCode(user, data.verificationCode);
            await this.adminService.markUserAsVerified(user);
            const { accessToken, refreshToken } = this.generateTokenPair(user);
            logger_1.default.info('Email verification successful', { userId: user.id });
            const returnUser = { ...user.get({ plain: true }) };
            user.refreshToken = refreshToken;
            await user.save();
            return { user: returnUser, accessToken, refreshToken };
        }
        catch (error) {
            return this.handleAuthError('Email verification', {}, error);
        }
    }
    /**
     * Generates a new email verification code.
     * @param token - JWT token associated with the verification.
     * @returns A new verification code string.
     */
    async generateNewCode(id, token) {
        try {
            logger_1.default.info('New verification code generation requested');
            return await this.verificationService.regenerateVerificationCode(id, token);
        }
        catch (error) {
            return this.handleAuthError('New code generation', {}, error);
        }
    }
    /**
     * Sends a password reset email to the user.
     * @param email - User's email address.
     */
    async forgotPassword(email) {
        try {
            logger_1.default.info('Password reset requested', { email });
            const user = await this.adminService.findUserByEmail(email);
            if (!user) {
                logger_1.default.error('Password reset requested for non-existent email', { email });
                throw new errors_1.NotFoundError('user for forgot password not found');
            }
            const { token, hashedToken } = this.passwordService.generateResetToken();
            await this.adminService.setPasswordResetDetails(user, hashedToken);
            await this.emailService.sendPasswordResetEmail(user.email, token);
            logger_1.default.info('Password reset email sent', { userId: user.id });
        }
        catch (error) {
            return this.handleAuthError('Password reset', { email }, error);
        }
    }
    /**
     * Resets the user's password using the reset token.
     * @param data - DTO with new password and reset token.
     * @returns New auth tokens.
     */
    async resetPassword(data) {
        try {
            logger_1.default.info('Password reset process started');
            const user = await this.adminService.findUserByResetToken(data.resetPasswordToken);
            const hashedPassword = await this.passwordService.hashPassword(data.password);
            await this.adminService.updateUserPassword(user, hashedPassword);
            const { accessToken, refreshToken } = this.generateTokenPair(user);
            logger_1.default.info('Password reset successful', { userId: user.id });
            return this.saveRefreshTokenAndReturn(user, accessToken, refreshToken);
        }
        catch (error) {
            return this.handleAuthError('Password reset', {}, error);
        }
    }
    /**
     * Retrieves a user by ID.
     * @param userId - ID of the user.
     * @returns User object.
     */
    async getUserById(userId) {
        try {
            logger_1.default.info('Get user by ID requested', { userId });
            const user = await this.adminService.findUserById(userId);
            logger_1.default.info('User retrieved successfully', { userId: user.id });
            return user;
        }
        catch (error) {
            return this.handleAuthError('Get user by ID', { userId }, error);
        }
    }
    /**
     * Returns the current authenticated user's details.
     * @param userId - Authenticated user's ID.
     * @returns User object.
     */
    async getMe(userId) {
        try {
            logger_1.default.info('Get current user requested', { userId });
            const user = await this.adminService.findUserById(userId);
            logger_1.default.info('Current user retrieved successfully', { userId });
            return user;
        }
        catch (error) {
            return this.handleAuthError('Get current user', { userId }, error);
        }
    }
    /**
     * Compares the given password with the user's stored password.
     * @param user - User instance.
     * @param password - Plain text password to validate.
     */
    async validatePassword(user, password) {
        const isMatch = await this.passwordService.comparePasswords(password, user.password);
        if (!isMatch) {
            logger_1.default.warn('Password validation failed', { userId: user.id });
            throw new errors_1.BadRequestError('Invalid credentials', 'INVALID_CREDENTIALS');
        }
        logger_1.default.info('Password validated successfully', { userId: user.id });
    }
    /**
     * Generates a new access/refresh token pair.
     * @param userId - ID of the user.
     * @returns Object containing access and refresh tokens.
     */
    generateTokenPair(user) {
        const accessToken = this.tokenService.generateAccessToken(user);
        const refreshToken = this.tokenService.generateRefreshToken(user);
        return { accessToken, refreshToken };
    }
    /**
     * Saves the refresh token on the user and returns the full auth response.
     * @param user - User instance.
     * @param accessToken - JWT access token.
     * @param refreshToken - JWT refresh token.
     * @returns Full login/auth return object.
     */
    async saveRefreshTokenAndReturn(passedUser, accessToken, refreshToken) {
        passedUser.refreshToken = refreshToken;
        await passedUser.save();
        const user = { ...passedUser };
        return { accessToken, user, refreshToken };
    }
    /**
     * Unified error handler for all auth-related operations.
     * @param operation - Operation name for logging.
     * @param context - Additional context info.
     * @param error - Error caught during operation.
     * @throws Error - Re-throws the original error.
     */
    async handleAuthError(operation, context, error) {
        logger_1.default.error(`${operation} failed`, { ...context, error });
        throw error;
    }
}
exports.AuthService = AuthService;
// factory/auth.factory.ts
function createAuthService() {
    const config = {
        jwtSecret: process.env.JWT_SECRET || 'udorakpuenyi',
        clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
        tokenExpiration: {
            verification: 86400,
            login: 3600,
            refresh: 86400 * 7,
        },
    };
    logger_1.default.info('AuthService factory creating new instance');
    return new AuthService(config);
}
