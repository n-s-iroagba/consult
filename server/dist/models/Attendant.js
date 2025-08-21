"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Attendant extends sequelize_1.Model {
}
Attendant.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    lastName: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    country: { type: sequelize_1.DataTypes.STRING, allowNull: false },
}, {
    sequelize: database_1.default,
    tableName: 'attendants',
    timestamps: true
});
exports.default = Attendant;
