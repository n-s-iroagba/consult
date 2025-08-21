"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = process.env.NODE_ENV === 'production'
    ? new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'mysql',
        logging: false,
    })
    : new sequelize_1.Sequelize(process.env.DB_NAME || 'dwayno', process.env.DB_USER || 'root', process.env.DB_PASSWORD || '97chocho', {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
    });
exports.default = sequelize;
