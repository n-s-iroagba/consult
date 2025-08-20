import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config';
import routes from './routes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Test DB Connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to DB:', err));

export default app;
