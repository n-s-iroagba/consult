import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize(process.env.DATABASE_URL!, { // DATABASE_URL should be like mysql://user:pass@host:port/dbname
      dialect: 'mysql',
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME || 'dwayno',
      process.env.DB_USER || 'root',
      process.env.DB_PASSWORD || '97chocho',
      {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: 'mysql',
        logging: false,
      }
    );

export default sequelize;
