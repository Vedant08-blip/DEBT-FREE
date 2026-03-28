import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import startReminderService from './services/reminderService.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Enable CORS
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/contact', contactRoutes);

// Serve Static Assets in Production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

if (isProduction) {
  console.log('--- PRODUCTION MODE: SERVING FRONTEND ---');
  app.use(express.static(path.join(rootDir, 'dist')));

  app.get(/.*/, (req, res) =>
    res.sendFile(path.resolve(rootDir, 'dist', 'index.html'))
  );
} else {
  console.log('--- DEVELOPMENT MODE: SERVING API MESSAGE ---');
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DebtFree API', env: process.env.NODE_ENV });
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  startReminderService();
});
