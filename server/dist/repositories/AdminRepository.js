"use strict";
// src/repositories/AdminnRepository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../models/Admin"));
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class AdminnRepository extends BaseRepository_1.default {
    constructor() {
        super(Admin_1.default);
    }
    async createUser(userData) {
        return await this.create(userData);
    }
    async findUserByEmail(email) {
        return await this.findOne({ email });
    }
    async findUserById(id) {
        return await this.findById(id);
    }
    async findUserByResetToken(hashedToken) {
        return await this.findOne({ passwordResetToken: hashedToken });
    }
    async findUserByVerificationToken(token) {
        return await this.findOne({ verificationToken: token });
    }
    async updateUserById(id, updates) {
        return await this.updateById(id, updates);
    }
    async getAllUsers() {
        const result = await this.findAll();
        return result.data;
    }
}
exports.default = new AdminnRepository();
