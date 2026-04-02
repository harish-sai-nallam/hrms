-- ══════════════════════════════════════════════════════════
-- HRMS DATABASE SETUP  (run once in pgAdmin or psql)
-- ══════════════════════════════════════════════════════════

-- USERS (employees, managers, super admin)
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  role        VARCHAR(20) CHECK (role IN ('super_admin','admin','employee')) DEFAULT 'employee',
  department  TEXT,
  position    TEXT,
  phone       TEXT,
  salary      NUMERIC(10,2) DEFAULT 0,
  status      VARCHAR(20) DEFAULT 'active',
  join_date   DATE,
  date_of_birth DATE
);

-- ATTENDANCE
CREATE TABLE IF NOT EXISTS attendance (
  id          SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  clock_in    TIME,
  clock_out   TIME,
  status      VARCHAR(20) CHECK (status IN ('present','absent','late')) DEFAULT 'present',
  hours       NUMERIC(4,2) DEFAULT 0,
  UNIQUE (employee_id, date)
);

-- LEAVES
CREATE TABLE IF NOT EXISTS leaves (
  id          SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT,
  from_date   DATE,
  to_date     DATE,
  days        INTEGER,
  reason      TEXT,
  status      VARCHAR(20) DEFAULT 'pending'
);

-- HOLIDAYS
CREATE TABLE IF NOT EXISTS holidays (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL,
  date  DATE NOT NULL,
  type  VARCHAR(30) DEFAULT 'Public'
);

-- EXPENSES
CREATE TABLE IF NOT EXISTS expenses (
  id          SERIAL PRIMARY KEY,
  employee_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category    TEXT,
  amount      NUMERIC(10,2),
  date        DATE DEFAULT CURRENT_DATE,
  description TEXT,
  status      VARCHAR(20) DEFAULT 'pending'
);

-- COMPANIES
CREATE TABLE IF NOT EXISTS companies (
  id      SERIAL PRIMARY KEY,
  name    TEXT NOT NULL,
  plan    VARCHAR(20) CHECK (plan IN ('free','monthly','yearly')) DEFAULT 'free',
  status  VARCHAR(20) CHECK (status IN ('active','expired')) DEFAULT 'active'
);

-- POLICIES
CREATE TABLE IF NOT EXISTS policies (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT DEFAULT 'General'
);

-- OFFBOARDING
CREATE TABLE IF NOT EXISTS offboarding (
  id                  SERIAL PRIMARY KEY,
  employee_id         TEXT,
  name                TEXT,
  department          TEXT,
  exit_date           DATE,
  exit_type           VARCHAR(30),
  reason              TEXT,
  notice_period       TEXT,
  settlement_status   VARCHAR(20) DEFAULT 'Pending',
  exit_interview_notes TEXT
);

-- ══════════════════════════════════════════════════════════
-- SEED DATA
-- ══════════════════════════════════════════════════════════

-- Demo users (passwords are bcrypt of 'demo1234')
INSERT INTO users (name, email, password, role, department, position, salary, status)
VALUES
  ('Super Admin',   'superadmin@gmail.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO', 'super_admin', NULL, NULL, 0, 'active'),
  ('Demo Manager',  'manager@gmail.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO', 'admin',       'Engineering', 'Engineering Manager', 85000, 'active'),
  ('Demo Employee', 'employee@gmail.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lihO', 'employee',    'Engineering', 'Software Developer',  60000, 'active')
ON CONFLICT (email) DO NOTHING;

-- Sample holidays
INSERT INTO holidays (name, date, type) VALUES
  ('New Year',     '2026-01-01', 'Public'),
  ('Republic Day', '2026-01-26', 'Public'),
  ('Holi',         '2026-03-25', 'Public'),
  ('Eid',          '2026-04-10', 'Public')
ON CONFLICT DO NOTHING;

-- Sample policies
INSERT INTO policies (title, description, category) VALUES
  ('Leave Policy',       'Employees are entitled to 20 days of paid leave per year.', 'HR'),
  ('Work From Home',     'Employees may work from home up to 2 days per week with manager approval.', 'Operations'),
  ('Code of Conduct',    'All employees must adhere to the company code of conduct at all times.', 'Compliance'),
  ('Expense Reimbursement', 'Submit expenses within 30 days with receipts. Max $500 without approval.', 'Finance')
ON CONFLICT DO NOTHING;

-- Sample attendance
INSERT INTO attendance (employee_id, date, clock_in, clock_out, status, hours)
SELECT u.id, '2026-04-01', '09:00:00', '18:00:00', 'present', 9.00
FROM users u WHERE u.email = 'employee@gmail.com'
ON CONFLICT DO NOTHING;

INSERT INTO attendance (employee_id, date, clock_in, clock_out, status, hours)
SELECT u.id, '2026-04-01', '09:30:00', '18:00:00', 'late', 8.50
FROM users u WHERE u.email = 'manager@gmail.com'
ON CONFLICT DO NOTHING;
