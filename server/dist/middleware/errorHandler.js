"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const errorHandler = (error, req, res) => {
    const statusCode = error.statusCode || 500;
    logger_1.default.error('❌ Error Handler Caught an Error', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        statusCode,
        url: req.originalUrl,
        method: req.method,
        body: req.body,
        ip: req.ip,
    });
    const response = {
        status: 'error',
        message: error.message || 'Internal server error',
        name: error.name,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack }),
    };
    res.status(statusCode).json(response);
};
exports.errorHandler = errorHandler;
