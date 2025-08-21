"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const requestLogger = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            timestamp: new Date().toISOString(),
            body: req.body,
        };
        if (res.statusCode >= 500) {
            logger_1.default.error('❌ Request failed', log);
        }
        else if (res.statusCode >= 400) {
            logger_1.default.warn('⚠️ Client error', log);
        }
        else {
            logger_1.default.info('✅ Request completed', log);
        }
    });
    next();
};
exports.requestLogger = requestLogger;
