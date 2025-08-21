"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class BankDetails extends sequelize_1.Model {
}
BankDetails.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bankName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    accountName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    accountNumber: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    swiftCode: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    routingNumber: { type: sequelize_1.DataTypes.STRING, allowNull: true }
}, {
    sequelize: database_1.default,
    tableName: 'bank_details',
    timestamps: true
});
exports.default = BankDetails;
