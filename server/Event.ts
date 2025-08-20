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
