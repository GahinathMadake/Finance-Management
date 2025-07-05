const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Import Routes 
const transactionRoutes = require('./src/routes/transaction.routes');
const dashboardRoutes = require('./src/routes/user.routes');
const budgetRoutes = require('./src/routes/budget.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
