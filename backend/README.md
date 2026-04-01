# Super Admin Backend — MERN Stack

A complete Node.js / Express / MongoDB backend for a SaaS Super Admin panel.

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                      # MongoDB connection
├── controllers/
│   ├── authController.js          # Auth: register, login, me, change-password
│   ├── companyController.js       # Companies CRUD (Add/Remove by Id & Name)
│   ├── subscriptionController.js  # Subscription management
│   ├── adminController.js         # Add / manage Super Admins
│   ├── siteConfigController.js    # Logo, Header, Footer config
│   └── dashboardController.js     # Dashboard stats
├── middleware/
│   ├── auth.js                    # JWT protect + superAdminOnly guard
│   ├── validate.js                # express-validator helper
│   └── errorHandler.js            # Global error handler + AppError class
├── models/
│   ├── SuperAdmin.js              # Admin schema with bcrypt
│   ├── Company.js                 # Company schema
│   ├── Subscription.js            # Subscription schema
│   └── SiteConfig.js             # Logo / Header / Footer schema
├── routes/
│   ├── auth.js
│   ├── companies.js
│   ├── subscriptions.js
│   ├── admins.js
│   ├── siteConfig.js
│   └── dashboard.js
├── seeder.js                      # Creates root admin + default site config
├── server.js                      # App entry point
├── package.json
└── .env.example
```

---

## ⚙️ Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET

# 3. Seed the root super admin (first-time only)
node seeder.js

# 4. Start development server
npm run dev

# 5. Start production server
npm start
```

---

## 🔑 Environment Variables

| Variable        | Description                        | Example                          |
|-----------------|------------------------------------|----------------------------------|
| `PORT`          | Server port                        | `5000`                           |
| `MONGO_URI`     | MongoDB connection string          | `mongodb://localhost:27017/mydb` |
| `JWT_SECRET`    | JWT signing secret (keep private!) | `your_random_secret_here`        |
| `JWT_EXPIRES_IN`| Token expiry                       | `7d`                             |
| `NODE_ENV`      | Environment                        | `development` / `production`     |

---

## 🌐 API Reference

### Auth  `/api/auth`

| Method | Endpoint               | Access  | Description                        |
|--------|------------------------|---------|-------------------------------------|
| POST   | `/register`            | Public  | First-time root admin setup         |
| POST   | `/login`               | Public  | Login and receive JWT               |
| GET    | `/me`                  | Private | Get current admin profile           |
| PUT    | `/change-password`     | Private | Change password                     |

**Login Request Body:**
```json
{ "email": "admin@example.com", "password": "Admin@1234" }
```

**Login Response:**
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "admin": { "id": "...", "name": "Root Admin", "email": "...", "role": "super_admin" }
}
```

> All private routes require `Authorization: Bearer <token>` header.

---

### Dashboard  `/api/dashboard`

| Method | Endpoint | Access  | Description                          |
|--------|----------|---------|--------------------------------------|
| GET    | `/`      | Private | Stats: companies, subscriptions, admins, recent activity |

---

### Companies  `/api/companies`

| Method | Endpoint               | Access  | Description                            |
|--------|------------------------|---------|----------------------------------------|
| GET    | `/`                    | Private | List all companies (filter/search/page)|
| GET    | `/:id`                 | Private | Get single company                     |
| POST   | `/`                    | Private | Add new company                        |
| PUT    | `/:id`                 | Private | Update company by ID                   |
| DELETE | `/:id`                 | Private | Deactivate by ID                       |
| DELETE | `/:id?name=CompanyX`   | Private | Deactivate by Name                     |
| DELETE | `/:id/permanent`       | Private | Permanently delete company             |
| PATCH  | `/:id/activate`        | Private | Reactivate a company                   |

**Query Params for GET `/`:**
- `?isActive=true` — filter by active status
- `?search=acme` — search by name or email
- `?page=1&limit=10` — pagination

**Add Company Body:**
```json
{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1234567890",
  "address": { "city": "New York", "country": "USA" }
}
```

---

### Subscriptions  `/api/subscriptions`

| Method | Endpoint                     | Access  | Description                      |
|--------|------------------------------|---------|----------------------------------|
| GET    | `/`                          | Private | List all subscriptions           |
| GET    | `/company/:companyId`        | Private | Get subscription for a company   |
| POST   | `/`                          | Private | Assign subscription to a company |
| PUT    | `/:id`                       | Private | Update subscription              |
| PATCH  | `/:id/cancel`                | Private | Cancel subscription              |

**Create Subscription Body:**
```json
{
  "companyId": "<company_id>",
  "plan": "pro",
  "price": 99,
  "billingCycle": "monthly",
  "endDate": "2026-01-01",
  "features": ["feature_a", "feature_b"]
}
```

Plans: `free` | `basic` | `pro` | `enterprise`

---

### Super Admins  `/api/admins`

| Method | Endpoint                  | Access  | Description                        |
|--------|---------------------------|---------|------------------------------------|
| GET    | `/`                       | Private | List all super admins              |
| POST   | `/`                       | Private | Add a new super admin              |
| PATCH  | `/:id/toggle-status`      | Private | Activate / Deactivate admin        |
| DELETE | `/:id`                    | Private | Delete a super admin               |

---

### Site Configuration  `/api/site-config`

| Method | Endpoint    | Access  | Description                   |
|--------|-------------|---------|-------------------------------|
| GET    | `/`         | Private | Get full site config          |
| PUT    | `/`         | Private | Update entire config at once  |
| PUT    | `/logo`     | Private | Update logo URL & alt text    |
| PUT    | `/header`   | Private | Update header settings        |
| PUT    | `/footer`   | Private | Update footer settings        |

**Update Header Body:**
```json
{
  "title": "My Platform",
  "subtitle": "Grow your business",
  "backgroundColor": "#1a1a2e",
  "textColor": "#ffffff",
  "navigationLinks": [
    { "label": "Home", "url": "/", "order": 1 },
    { "label": "Pricing", "url": "/pricing", "order": 2 },
    { "label": "Contact", "url": "/contact", "order": 3 }
  ]
}
```

---

## 🔒 Security Notes

- Passwords are hashed with **bcryptjs** (12 salt rounds)
- JWT tokens expire in **7 days** by default
- Deactivated admins are blocked at middleware level
- An admin **cannot deactivate or delete their own account**
- The `/register` route is disabled once any admin exists — use `/api/admins` instead

---

## 📦 Dependencies

| Package             | Purpose                        |
|---------------------|--------------------------------|
| express             | Web framework                  |
| mongoose            | MongoDB ODM                    |
| bcryptjs            | Password hashing               |
| jsonwebtoken        | JWT auth                       |
| express-validator   | Request validation             |
| cors                | Cross-Origin Resource Sharing  |
| dotenv              | Environment variable loading   |
| nodemon *(dev)*     | Auto-restart on file changes   |
