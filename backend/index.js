const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

// Import Routes 
const transactionRoutes = require('./src/routes/transaction.routes');
const dashboardRoutes = require('./src/routes/user.routes');
const budgetRoutes = require('./src/routes/budget.routes');
const categoryRoutes = require('./src/routes/category.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:5173', // local dev frontend
      'https://finance-management-frontend-s9g3.onrender.com' // deployed frontend
    ],
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
app.use('/api/category', categoryRoutes);

app.get('/', (req, res)=>{
  res.send("Server is live");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
