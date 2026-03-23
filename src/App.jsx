import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyLoans from './pages/MyLoans';
import Strategy from './pages/Strategy';
import Simulator from './pages/Simulator';
import Reminders from './pages/Reminders';
import Profile from './pages/Profile';

// Simple Protected Route wrapper checking local storage
const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  // If not authenticated, redirect to login
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Check if user is already logged in, so we don't show them login page again
const PublicOnlyRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } />
        <Route path="/register" element={
          <PublicOnlyRoute>
            <Register />
          </PublicOnlyRoute>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/loans" element={
          <ProtectedRoute>
            <MyLoans />
          </ProtectedRoute>
        } />
        <Route path="/strategy" element={
          <ProtectedRoute>
            <Strategy />
          </ProtectedRoute>
        } />
        <Route path="/simulator" element={
          <ProtectedRoute>
            <Simulator />
          </ProtectedRoute>
        } />
        <Route path="/reminders" element={
          <ProtectedRoute>
            <Reminders />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
