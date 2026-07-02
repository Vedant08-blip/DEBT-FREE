[![npm](https://img.shields.io/npm/v/debt-free?logo=npm)](package.json)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-3C873A?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-8+-646CFF?logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

# DEBT-FREE 🚀

**Your Path to Financial Freedom: Track, Conquer, Thrive! 💰➡️✨**

**DEBT-FREE** is a state-of-the-art **full-stack financial management web application** designed to help users track liabilities, simulate payment strategies (Snowball, Avalanche), log windfalls, and optimize their path to debt freedom. With interactive calendar planning, real-time DTI health analysis, credit score simulation, and visual progress tracking, it serves as your automated personal finance strategist.

📱 **Fully Responsive Layout** | ⚡ **Vite-Powered Frontend** | 🔒 **Robust JWT & DOB Auth** | 📊 **Real-time Analytics** | 🔌 **Offline Demo Sandbox**

---

## 📸 Interactive Showcase & UI/UX

The interface is built with premium **liquid glassmorphism** style, featuring Outfit typography, custom glow backdrops, and responsive motion animations powered by **Framer Motion**.

![Landing Page](src/assets/hero.png)
*(Create a `screenshots/` directory to save your custom interface visual states!)*

---

## ✨ Features

### 🌐 Frontend (React 19 & Vite 8)

*   **📊 Custom Financial Analytics & Health Score**:
    *   **Financial Health Index (0-100)**: Evaluates overall financial status by adjusting points for high DTI, savings rate, and expense ratios.
    *   **DTI Ratio Tracker**: Calculates the Debt-to-Income (DTI) ratio with risk levels categorized into **Healthy** (≤36%), **Caution** (37%-49%), and **Critical** (≥50%) zones.
    *   **Expenses Breakdown Chart**: Visualizes categorized monthly expenditures (housing, food, transit, utilities, etc.) via responsive Recharts.
*   **📅 Interactive Payoff Calendar**:
    *   Month-view tracker showing all scheduled EMI due dates.
    *   Integrated payment check-off list (paid/unpaid states persistent across months).
    *   Visual warnings and check indicators for active debt oversight.
*   **🎓 Credit Academy & Score Simulator**:
    *   **Credit Score Simulator (300-850)**: Toggle variables (payment history, credit utilization, account age, credit mix, hard inquiries) to see simulated credit score adjustments in real-time.
    *   **Best Practices Checklist**: Hands-on checklists for maintaining healthy CIBIL and creditworthiness.
*   **💡 Interactive Tips Library & Social Forum**:
    *   Standardized guides for complex strategies (e.g., Snowflake method/micro-payments, interest rate negotiation script, psychological dopamine-looping).
    *   Social bookmarks and upvoting features.
    *   Mock community board to post custom tips, view comments, and share strategies.
*   **🧮 Amortization Modals & Extra Payments Simulator**:
    *   Deep-dive monthly breakdown table displaying interest vs. principal split for each installment.
    *   **Prepayment Accelerator**: Simulate prospective extra payments to see calculated interest savings and early debt-free milestones.
    *   **Data Export**: Single-click CSV export representing full loan/liability details and print-to-PDF styles for statements.
*   **🔄 Progress Heatmap & Windfall Syncing**:
    *   Github-style contribution calendar visualizing payment frequency and windfall allocations.
    *   **Windfall Syncing**: Add custom windfall entries (bonuses, side income, tax refunds) and dynamically map/apply them towards active loans to accelerate payoff calendars.
    *   **Advanced Filtering**: Filter the heatmap view to only show payments, only show windfalls, or display both combined.
*   **🔌 Zero-Setup Demo Mode**:
    *   Try the full application in 1 click! Click "Try Demo Mode" or log in with email `demo@example.com` and password `demo` to access a fully mock-intercepted sandbox using local storage persistence.

### ⚙️ Backend (Node.js 20 & Express 5)

*   **🔒 Secure Authentication**: JWT cookies, bcrypt password hashing, and role-based access control (User/Admin).
*   **🔑 Password Recovery & DOB Validation**: Forgot-password form verifying registered email and Date of Birth (DOB) to securely reset user credentials.
*   **💳 Loan CRUD API**: Secure routes to manage loans with MongoDB (Mongoose).
*   **⏰ Automated Reminders**: Cron jobs + Nodemailer integration for automated email notifications.
*   **🛡️ Performance Refactoring**:
    *   Synchronized auth state initialization to prevent protected page layout jumps.
    *   Optimized data fetching with mount-safety hooks.
    *   Custom routing compatibility fixes for Express 5 catch-all routes.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React **19**, Vite **8**, React Router 7, Recharts, Framer Motion, Lucide Icons |
| **Styling** | Tailwind CSS 3.4, Tailwind Merge, clsx, PostCSS, Autoprefixer |
| **Backend** | Node.js 20, Express 5, MongoDB (Mongoose 9), JWT, bcryptjs |
| **Utilities** | Nodemailer, node-cron, dotenv, CORS, express-async-handler |
| **Dev Tools** | ESLint 9, Nodemon, Concurrently |

---

## 🚀 Quick Start (Fullstack)

### Prerequisites

*   **Node.js** 20+
*   **MongoDB** Atlas (free tier) or a local MongoDB instance
*   [Gmail App Password](https://support.google.com/mail/answer/185833) (optional, for email reminders)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd DEBT-FREE
npm install
```

### 2. Environment Setup

Create a `.env` file in the **backend/** directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here_min32chars
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:5173
```

### 3. Run Modes

#### 📱 Option A: Demo Mode (No Setup Required)
Start the frontend dev server:
```bash
npm run dev
```
Open **http://localhost:5173** and click **"Try Demo Mode"** (or log in with `demo@example.com` / password: `demo`). This runs entirely in the browser using mock data and local storage interception!

#### 🔌 Option B: Backend Only
```bash
npm run server
```
Runs the API server at **http://localhost:5000**.

#### 🚀 Option C: Fullstack Mode (Recommended for development)
```bash
npm run dev:full
```
Runs both the frontend (http://localhost:5173) and backend API (http://localhost:5000) concurrently using live database connections.

---

## 📁 Project Structure

```text
DEBT-FREE/
├── backend/            # Express.js REST API
│   ├── config/         # Database configuration
│   ├── controllers/    # Authentication, loans, contact & analytics controllers
│   ├── middleware/     # Auth checks, error handling
│   ├── models/         # User & Loan schemas
│   ├── routes/         # API routing definitions
│   ├── services/       # Email & cron reminder services
│   └── utils/          # Token generation & email helpers
├── src/                # React 19 Frontend
│   ├── components/     # UI & Domain components
│   │   ├── charts/     # Custom Bar, Donut, Line & Ring charts (Recharts)
│   │   ├── layout/     # Sidebar, Navbar, Footer, PageWrapper
│   │   ├── loans/      # Amortization Modal, Loan Cards, Forms & Summaries
│   │   └── ui/         # Buttons, Inputs, Particle Canvas, Progress Heatmap, Toasts, etc.
│   ├── pages/          # All views (Dashboard, Analytics, Calendar, Academy, Tips, etc.)
│   ├── utils/          # API layer, EMI calculators, currency formatting
│   └── assets/         # CSS, icons, images
├── public/             # Static files
├── package.json        # Monorepo dependencies & script runner
└── README.md           # This file! 🚀
```

---

## 🔌 API Documentation

All API requests should target `http://localhost:5000/api` (or your deployed server endpoint).

### Authentication Endpoints

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/auth/register` | POST | None | Register a new user profile |
| `/auth/login` | POST | None | Authenticate credentials and return JWT |
| `/auth/reset-password` | POST | None | Reset password via email & DOB verification |
| `/auth/profile` | PUT | JWT | Update name, net income, currency, saving goals, avatar |
| `/auth/change-password` | PUT | JWT | Change user password |
| `/auth/reminders` | PUT | JWT | Save global reminder settings |
| `/auth/test-reminder` | POST | JWT | Send a test reminder email immediately |
| `/auth/users` | GET | JWT (Admin) | List all registered users (Admin panel) |

### Loan Management Endpoints

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/loans` | GET | JWT | Fetch all loans for the logged-in user |
| `/loans` | POST | JWT | Add a new loan |
| `/loans/:id` | PUT | JWT | Update loan details (remaining balance, tenure, EMIs) |
| `/loans/:id` | DELETE | JWT | Delete a tracked loan |
| `/loans/admin` | GET | JWT (Admin) | Retrieve all loans across the platform |

### Analytics & Inquiry Endpoints

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/analytics/summary` | GET | JWT | Get metrics (total debt, principal paid, DTI ratio, health score) |
| `/analytics/expenses` | GET | JWT | Fetch categorized expenses summary |
| `/contact` | POST | None | Submit a contact support query (emails Admin) |

---

## ☁️ Deployment

### Frontend (Vercel / Netlify / Cloudflare)
1. Build the production build:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` directory.
3. Configure the environment variable: `VITE_API_URL=https://your-backend-api.com/api`

### Backend (Render / Railway / Heroku)
1. Connect your repository to the hosting platform.
2. Configure environment variables in the dashboard (MongoDB URI, JWT secret, etc.).
3. Build command: `npm install`
4. Start command: `npm start`

---

## 🤝 Contributing

1. **Fork** the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "feat: add amazing feature"`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**.

Refer to [CONTRIBUTING.md](CONTRIBUTING.md) (create it!) for further development guidelines.

---

## 📄 License

This project is licensed under the **MIT License**. Check out [LICENSE](LICENSE) for more details.

---

## 👨‍💻 Author

**Vedant Trivedi**

[![GitHub](https://img.shields.io/badge/GitHub-VedantTrivedi-black?logo=github)](https://github.com/VedantTrivedi)
[![Portfolio](https://img.shields.io/badge/Portfolio-VedantTrivedi-6366F1?logo=vercel)](https://vedanttrivedi.com)
[![Star](https://img.shields.io/github/stars/VedantTrivedi/DEBT-FREE?style=social)](https://github.com/VedantTrivedi/DEBT-FREE)

⭐ **Star this repository if it helped you on your path to financial freedom!** ⭐
