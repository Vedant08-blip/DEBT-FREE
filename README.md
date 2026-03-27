[![npm](https://img.shields.io/npm/v/debt-free?logo=npm)](package.json)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-3C873A?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248?logo=mongodb)](https://mongodb.com)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwindcss)](https://tailwindcss.com)

# DEBT-FREE 🚀

**Your Path to Financial Freedom: Track, Conquer, Thrive! 💰➡️✨**

**DEBT-FREE** is a cutting-edge **full-stack web application** built to empower you on your journey to debt freedom. Seamlessly track loans, simulate payoff strategies (snowball, avalanche), visualize progress with stunning charts, receive smart reminders, and celebrate milestones!

📱 **Fully Responsive** | ⚡ **Blazing Fast** (Vite) | 🔒 **Secure Auth** | 📊 **Real-time Analytics**

![Hero Image](src/assets/hero.png)

## ✨ Features

### 🌐 **Frontend**
- 📈 **Interactive Charts & Visualizations**: Custom Progress Rings, Bar/Line/Donut charts (Recharts)
- 🎮 **Debt Payoff Simulator**: Snowball & Avalanche strategies with EMI calculations
- 📊 **Smart Dashboard**: Real-time debt summary, analytics, loan progress
- 🎨 **Modern UI/UX**: 20+ Custom components (GlitchText, Particles, Modals, Toasts), TailwindCSS, Framer Motion animations
- 🧭 **Complete Page Suite**: Landing, Dashboard, MyLoans, Simulator, Strategy, Reminders, Profile, Admin Panel, Auth flows
- 🔧 **Utilities**: `calcEMI()`, currency formatting, API helpers

### ⚙️ **Backend**
- 👥 **Secure Authentication**: JWT, bcrypt, role-based (User/Admin)
- 💳 **Loan CRUD**: Full loan management with MongoDB (Mongoose)
- ⏰ **Smart Reminders**: Cron jobs + Nodemailer email notifications
- 🔌 **RESTful API**: Express.js with async handlers, CORS, error middleware
- 🛡️ **Production Ready**: Env vars, DB connection, token generation

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React **19**, Vite **5**, React Router 7, Recharts, Framer Motion, Lucide Icons |
| **Styling** | Tailwind CSS 3.4, Tailwind Merge, clsx, PostCSS, Autoprefixer |
| **Backend** | Node.js 20, Express 5, MongoDB (Mongoose 9), JWT 9, bcryptjs |
| **Utilities** | Nodemailer, node-cron, dotenv, CORS, express-async-handler |
| **Dev Tools** | ESLint 9, Nodemon, Concurrently |
| **UI Components** | 20+ Custom: Button, Modal, Charts, Toast, Spinner, etc. |

## 🚀 Quick Start (Fullstack)

### Prerequisites
- Node.js 20+
- MongoDB Atlas (free tier) or local MongoDB
- [Gmail App Password](https://support.google.com/mail/answer/185833) for emails (optional)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd DEBT-FREE
npm install
```

### 2. Environment Setup
Create `.env` in **backend/**:
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

**Frontend Only** (uses mock data):
```bash
npm run dev
```
🌐 http://localhost:5173

**Backend Only**:
```bash
npm run server
```
🔌 http://localhost:5000

**Fullstack** (recommended):
```bash
npm run dev:full
```
🌐 Frontend: http://localhost:5173 | 🔌 Backend: http://localhost:5000

## 📁 Project Structure

```
DEBT-FREE/
├── backend/            # Node/Express API
│   ├── config/         # DB config
│   ├── controllers/    # Auth & Loan logic
│   ├── middleware/     # Auth, error handling
│   ├── models/         # User, Loan schemas
│   ├── routes/         # API routes
│   ├── services/       # Reminders, email
│   └── utils/          # Token, email utils
├── src/                # React Frontend
│   ├── components/     # UI & domain components
│   ├── pages/          # All pages (20+)
│   ├── utils/          # EMI calc, API, formatters
│   └── assets/         # Images, icons
├── public/             # Static assets
├── package.json        # Monorepo deps & scripts
└── README.md           # You're reading it! 😎
```

## 📸 Screenshots

![Dashboard](screenshots/dashboard.png)
![My Loans](screenshots/loans.png)
![Simulator](screenshots/simulator.png)

*Create `screenshots/` folder and add your own! 📷*

## 🔌 API Documentation

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register user |
| `/api/auth/login` | POST | No | Login & get JWT |
| `/api/loans` | GET/POST | Yes | List/create loans |
| `/api/loans/:id` | GET/PUT/DELETE | Yes | Single loan ops |

**Base URL**: `http://localhost:5000/api`

## ☁️ Deployment

### Frontend (Vercel/Netlify)
1. `npm run build`
2. Deploy `dist/` folder
3. Set `VITE_API_URL=https://your-backend-api.com/api`

### Backend (Railway/Render)
1. Push to Git
2. Add MongoDB + env vars
3. Build command: `npm install`
4. Start command: `npm start`

### Docker (Coming Soon)

## 🤝 Contributing

1. Fork & clone
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m "Add amazing feature"`
4. Push & PR!

See [CONTRIBUTING.md](CONTRIBUTING.md) (create it!) for details.

**Code of Conduct**: [Contributor Covenant](CODE_OF_CONDUCT.md)

## 📈 Changelog

See [TODO.md](TODO.md) for current tasks.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

**Vedant Trivedi**

[![GitHub](https://img.shields.io/badge/GitHub-VedantTrivedi-black?logo=github)](https://github.com/VedantTrivedi)
[![Portfolio](https://img.shields.io/badge/Portfolio-VedantTrivedi-6366F1?logo=vercel)](https://vedanttrivedi.com)
[![Star](https://img.shields.io/github/stars/VedantTrivedi/DEBT-FREE?style=social)](https://github.com/VedantTrivedi/DEBT-FREE)

⭐ **Star this repo if it helps!** ⭐

---

*Made with ❤️ for financial freedom* 💪
