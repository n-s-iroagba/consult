"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const cookieOptions_1 = require("../config/cookieOptions");
const AuthService_1 = require("../services/AuthService");
const errors_1 = require("../utils/errors");
const logger_1 = __importDefault(require("../utils/logger"));
class AuthController {
    constructor() {
        this.authService = (0, AuthService_1.createAuthService)();
        /**
         * Handles applicant sign-up and assigns the 'APPLICANT' role.
         * @param req Express request object
         * @param res Express response object
         * @param next Express next middleware function
         */
        this.signUpAdmin = async (req, res, next) => {
            try {
                const { result, user } = await this.authService.signUp(req.body);
                const userId = user?.id;
                if (!userId) {
                    logger_1.default.error('User ID not found in signup result', { result });
                    throw new errors_1.BadRequestError('Failed to create user');
                }
                const response = {
                    verificationToken: result.verificationToken,
                };
                res.status(201).json(response);
                return;
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Handles staff sign-up.
         * @param req Express request object
         * @param res Express response object
         * @param next Express next middleware function
         */
        this.staffSignUp = async (req, res, next) => {
            try {
                const result = await this.authService.signUp({ ...req.body });
                res.status(201).json(result);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Resends email verification code.
         * @param req Express request object
         * @param res Express response object
         * @param next Express next middleware function
         */
        this.resendCode = async (req, res, next) => {
            try {
                const { token, id } = req.body;
                const newToken = await this.authService.generateNewCode(token, id);
                res.json({ verificationToken: newToken, id });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Sends password reset email.
         * @param req Express request object
         * @param res Express response object
         * @param next Express next middleware function
         */
        this.forgotPassword = async (req, res, next) => {
            try {
                const { email } = req.body;
                if (!email) {
                    res.status(400).json({ message: 'Email is required' });
                    return;
                }
                await this.authService.forgotPassword(email);
                res.status(200).end();
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Returns currently authenticated user details.
         * @param req Express request object
         * @param res Express response object
         * @param next Express next middleware function
         */
        this.getMe = async (req, res, next) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return;
                }
                const user = await this.authService.getMe(userId);
                console.log('AUTH USER', user);
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.login = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: 'Email and password are required' });
                    return;
                }
                const result = await this.authService.login({ email, password });
                // Check if result has refreshToken property (verified user)
                if ('refreshToken' in result && 'accessToken' in result) {
                    // User is verified
                    const verified = result;
                    const cookieOptions = (0, cookieOptions_1.getCookieOptions)();
                    console.log('Setting refresh token cookie with options:', cookieOptions);
                    res.cookie('refreshToken', verified.refreshToken, cookieOptions);
                    res.status(200).json({
                        user: verified.user,
                        accessToken: verified.accessToken,
                    });
                }
                else {
                    // User not verified
                    const unverified = result;
                    res.status(200).json(unverified);
                }
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Verifies user's email with improved cookie setting
         */
        this.verifyEmail = async (req, res, next) => {
            try {
                const result = await this.authService.verifyEmail(req.body);
                const cookieOptions = (0, cookieOptions_1.getCookieOptions)();
                console.log('Setting refresh token cookie after verification:', cookieOptions);
                res.cookie('refreshToken', result.refreshToken, cookieOptions);
                const authUser = result.user;
                console.log('auth user', authUser);
                res.status(200).json({
                    user: authUser,
                    accessToken: result.accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const result = await this.authService.resetPassword(req.body);
                const cookieOptions = (0, cookieOptions_1.getCookieOptions)();
                console.log('Setting refresh token cookie after password reset:', cookieOptions);
                res.cookie('refreshToken', result.refreshToken, cookieOptions);
                // Extract only the properties you need from the user object
                const userResponse = {
                    id: result.user.id,
                    email: result.user.email,
                    username: result.user.username,
                    // Add other properties you need
                };
                res.status(200).json({
                    user: userResponse,
                    accessToken: result.accessToken,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.refreshToken = async (req, res, next) => {
            try {
                console.log('All cookies received:', req.cookies);
                console.log('Headers:', req.headers.cookie);
                const cookieHeader = req.headers.cookie;
                console.log('Raw cookie header:', cookieHeader);
                if (!cookieHeader) {
                    res.status(401).json({ message: 'No cookies provided' });
                    return;
                }
                // Extract the refreshToken value from the cookie string
                const refreshToken = cookieHeader
                    .split(';')
                    .find(cookie => cookie.trim().startsWith('refreshToken='))
                    ?.split('=')[1];
                console.log('Extracted refresh token:', refreshToken ? 'Present' : 'Missing');
                console.log('Token preview:', refreshToken ? `${refreshToken.substring(0, 20)}...` : 'None');
                if (!refreshToken) {
                    res.status(401).json({ message: 'No refresh token found in cookies' });
                    return;
                }
                // Now pass just the token value (not the whole cookie header)
                const accessToken = await this.authService.refreshToken(refreshToken);
                res.status(200).json(accessToken);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Logout with improved cookie clearing
         */
        this.logout = async (req, res, next) => {
            try {
                const isProduction = process.env.NODE_ENV === 'production';
                const clearOptions = {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: (isProduction ? 'none' : 'lax'),
                    domain: isProduction ? process.env.COOKIE_DOMAIN : undefined,
                    path: '/', // Important: match the path used when setting
                };
                console.log('Clearing cookie with options:', clearOptions);
                res.clearCookie('refreshToken', clearOptions);
                res.status(200).json({ message: 'Logged out successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
