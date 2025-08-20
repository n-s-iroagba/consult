import { Model, DataTypes } from 'sequelize';
import sequelize from './config';

class Event extends Model {
  declare id: number;
  declare title: string;
  declare date: string;
  declare time: string;
  declare location: string;
  declare price: string;
  declare category: string;
  declare attendees: string;
  declare description: string;
}

Event.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: false },
    time: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    attendees: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: false }
  },
  {
    sequelize,
    tableName: 'events',
    timestamps: true
  }
);

export default Event;

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