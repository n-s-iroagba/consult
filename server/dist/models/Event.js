"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Event extends sequelize_1.Model {
}
Event.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    date: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    time: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    location: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    price: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    category: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    attendees: { type: sequelize_1.DataTypes.STRING, allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: false }
}, {
    sequelize: database_1.default,
    tableName: 'events',
    timestamps: true
});
exports.default = Event;
const upcomingEvents = [
    {
        id: 1,
        title: "Enterprise Security Leadership Summit 2024",
        date: "2024-09-25",
        time: "09:00 AM",
        location: "Eko Hotel, Lagos",
        price: "$250,000",
        category: "Executive Summit",
        attendees: "200+ CISOs",
        description: "Strategic cybersecurity leadership for C-suite executives"
    },
    {
        id: 2,
        title: "Advanced Penetration Testing Masterclass",
        date: "2024-10-15",
        time: "10:00 AM",
        location: "Transcorp Hilton, Abuja",
        price: "$180,000",
        category: "Technical Workshop",
        attendees: "Security Professionals",
        description: "Hands-on ethical hacking and vulnerability assessment"
    },
    {
        id: 3,
        title: "Cloud Security Architecture Bootcamp",
        date: "2024-11-08",
        time: "09:00 AM",
        location: "Online & Hybrid",
        price: "$120,000",
        category: "Certification Program",
        attendees: "Cloud Architects",
        description: "Comprehensive AWS, Azure, and GCP security training"
    }
];
