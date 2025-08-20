import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config';
import routes from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use((req, res, next) => {
 console.log(`${req.method} request to ${req.url}`);
  next();
});

// Routes
app.use('/api', routes);

// Test DB Connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to DB:', err));

// Sync database only in non-production (optional)
if (process.env.NODE_ENV !== 'production') {
  sequelize.sync({ force: true })
    .then(() => console.log('Database synced (force: true) in development mode'))
    .catch(err => console.error('Failed to sync database:', err));
}

// Determine port: 5000 for dev, env port otherwise
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
