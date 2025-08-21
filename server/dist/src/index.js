"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes/routes"));
const Event_1 = __importDefault(require("./models/Event"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman, mobile apps, etc.)
        if (!origin)
            return callback(null, true);
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'https://klitzcybersecurity.com',
            'https://www.klitzcybersecurity.com'
        ];
        console.log('🔍 CORS Check - Origin:', origin);
        if (allowedOrigins.includes(origin)) {
            console.log('✅ Origin allowed');
            callback(null, true);
        }
        else {
            console.log('❌ Origin blocked');
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control'
    ],
    optionsSuccessStatus: 200 // For legacy browser support
}));
// Handle preflight requests explicitly
app.options('/api', (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});
// Routes
app.use('/api', routes_1.default);
app.use('/api/auth', authRoutes_1.default);
console.log('ENV', process.env.NODE_ENV);
// Test DB Connection
database_1.default.authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Unable to connect to DB:', err));
// Sync database only in non-production (optional)
// if (process.env.NODE_ENV !== 'production') {
//   sequelize.sync({ force: true })
//     .then(() => console.log('Database synced (force: true) in development mode'))
//     .catch(err => console.error('Failed to sync database:', err));
// }
const seedEvent = async () => {
    await database_1.default.sync({ force: true });
    const existingEvent = await Event_1.default.findByPk(1);
    if (!existingEvent) {
        await Event_1.default.create({
            title: 'Cloud Mining & Society Harnessing Digital Wealth For Social Impact',
            date: '26-08-2025',
            location: 'Hyatt Regency Birmingham-The Wynfrey Hotel. 1000 Riverchase Galleria, Hoover, Birmingham, AL.',
            description: 'This is a sample event for demonstration purposes.',
            time: '10:00 AM - 4:00 PM',
            price: 20000,
            category: 'Conference',
            attendees: '500+',
        });
    }
};
// seedEvent()
// Determine port: 5000 for dev, env port otherwise
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
