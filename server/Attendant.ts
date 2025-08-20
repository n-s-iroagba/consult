import { Model, DataTypes } from 'sequelize';
import sequelize from './config';

class Attendant extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare email: string;

}

Attendant.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },

  },
  {
    sequelize,
    tableName: 'addresses',
    timestamps: true
  }
);

export default Attendant;