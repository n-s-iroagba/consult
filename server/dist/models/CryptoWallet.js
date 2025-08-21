"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class CryptoWallet extends sequelize_1.Model {
}
CryptoWallet.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false }
}, {
    sequelize: database_1.default,
    tableName: 'crypto_wallets',
    timestamps: true
});
exports.default = CryptoWallet;
