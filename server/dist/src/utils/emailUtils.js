"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("./logger"));
const EMAIL_TEMPLATES = {
    APPLICATION_SUBMITTED: {
        subject: 'Application Submitted Successfully - Remington College',
        template: 'application-submitted',
    },
    APPLICATION_UNDER_REVIEW: {
        subject: 'Application Under Review - Remington College',
        template: 'application-under-review',
    },
    DOCUMENT_VERIFICATION: {
        subject: 'Document Verification Status - Remington College',
        template: 'document-verification',
    },
    DECISION_MADE: { subject: 'Application Decision - Remington College', template: 'decision-made' },
    ACCEPTANCE_FEE_RECEIVED: {
        subject: 'Acceptance Fee Payment Confirmation - Remington College',
        template: 'payment-confirmation',
    },
    ENROLLMENT_CONFIRMED: {
        subject: 'Welcome to Remington College!',
        template: 'enrollment-confirmed',
    },
    DOCUMENT_REQUEST: {
        subject: 'Additional Documents Required - Remington College',
        template: 'document-request',
    },
    EMAIL_VERIFICATION: {
        subject: 'Verify Your Email - Remington College',
        template: 'email-verification',
    },
    RESET_PASSWORD: { subject: 'Reset Password - Remington College', template: 'reset-password' },
};
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    async init() {
        const handlebars = (await Promise.resolve().then(() => __importStar(require('nodemailer-express-handlebars')))).default;
        this.transporter.use('compile', handlebars({
            viewEngine: {
                extname: '.hbs',
                partialsDir: path_1.default.resolve(__dirname, '../templates/emails'),
                layoutsDir: path_1.default.resolve(__dirname, '../templates/emails/layouts'),
                defaultLayout: 'main',
            },
            viewPath: path_1.default.resolve(__dirname, '../templates/emails'),
            extName: '.hbs',
        }));
        await this.verifyConnection();
    }
    async sendEmail(to, templateName, data) {
        try {
            const template = EMAIL_TEMPLATES[templateName];
            const mailOptions = {
                from: process.env.SMTP_FROM,
                to,
                subject: template.subject,
                template: template.template,
                context: {
                    ...data,
                    year: new Date().getFullYear(),
                    collegeUrl: process.env.CLIENT_URL,
                },
            };
            const info = await this.transporter.sendMail(mailOptions);
            logger_1.default.info(`Email sent to ${to}`, { messageId: info.messageId, template: templateName });
            return info;
        }
        catch (error) {
            logger_1.default.error('Failed to send email:', error);
            throw new Error('Email sending failed');
        }
    }
    async sendVerificationEmail(to, name, token) {
        return this.sendEmail(to, 'EMAIL_VERIFICATION', { name, verificationToken: token });
    }
    async sendPasswordResetEmail(to, token) {
        return this.sendEmail(to, 'RESET_PASSWORD', { verificationToken: token });
    }
    async verifyConnection() {
        try {
            await this.transporter.verify();
            logger_1.default.info('Email service connection verified');
            return true;
        }
        catch (error) {
            logger_1.default.error('Email service verification failed:', error);
            return false;
        }
    }
}
const emailService = new EmailService();
exports.default = emailService;
