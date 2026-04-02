const express = require('express');
const cors = require('cors');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ── BUG FIX 1: CORS was locked to port 8080 but Vite runs on 5173 ─────────
const ALLOWED_ORIGINS = [
  'http://localhost:5173',  // Vite default
  'http://localhost:8080',  // fallback
  'http://localhost:3000',  // CRA fallback
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'hrms-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
}));

// Routes
const authRoutes       = require('./routes/auth');
const employeeRoutes   = require('./routes/employees');
const attendanceRoutes = require('./routes/attendance');
const leaveRoutes      = require('./routes/leaves');
const holidayRoutes    = require('./routes/holidays');
const expenseRoutes    = require('./routes/expenses');
const offboardingRoutes = require('./routes/offboarding');
const adminRoutes      = require('./routes/admin');
const companiesRoutes  = require('./routes/companies');  // BUG FIX 4: was never registered
const policiesRoutes   = require('./routes/policies');   // BUG FIX 6: missing route
const payslipRoutes    = require('./routes/payslip');    // BUG FIX 5: missing route

app.use('/api/auth',        authRoutes);
app.use('/api/employees',   employeeRoutes);
app.use('/api/attendance',  attendanceRoutes);
app.use('/api/leaves',      leaveRoutes);
app.use('/api/holidays',    holidayRoutes);
app.use('/api/expenses',    expenseRoutes);
app.use('/api/offboarding', offboardingRoutes);
app.use('/api/admin',       adminRoutes);
app.use('/api/companies',   companiesRoutes);   // ← now registered
app.use('/api/policies',    policiesRoutes);    // ← now registered
app.use('/api/payslip',     payslipRoutes);     // ← now registered

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
