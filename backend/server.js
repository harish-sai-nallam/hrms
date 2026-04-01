const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'hrms-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Import routes
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
const leaveRoutes = require('./routes/leaves');
//const payrollRoutes = require('./routes/payroll');
const holidayRoutes = require('./routes/holidays');
const expenseRoutes = require('./routes/expenses');
const offboardingRoutes = require('./routes/offboarding');
const adminRoutes = require('./routes/admin');
//const abordeRoutes = require('./routes/aborde');

// Register ALL routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
//app.use('/api/payroll', payrollRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/offboarding', offboardingRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/aborde', absordeRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
