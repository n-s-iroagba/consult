import { Model, DataTypes } from 'sequelize';
import sequelize from './config';

class CryptoWallet extends Model {
  declare id: number;
  declare address: string;
  declare symbol: string;
  declare name: string;
}

CryptoWallet.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, allowNull: false },
    symbol: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false }
  },
  {
    sequelize,
    tableName: 'crypto_wallets',
    timestamps: true
  }
);

export default CryptoWallet;
