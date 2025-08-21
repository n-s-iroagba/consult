import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Attendant extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare country: string;

}

Attendant.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },

  },
  {
    sequelize,
    tableName: 'attendants',
    timestamps: true
  }
);

export default Attendant;