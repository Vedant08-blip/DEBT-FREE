const API_URL = '/api';

const isDemoMode = () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return !!(userInfo && userInfo.isDemo);
  } catch (e) {
    return false;
  }
};

const DEFAULT_DEMO_LOANS = [
  {
    _id: "demo-loan-1",
    name: "Home Mortgage",
    outstanding: 4500000,
    interestRate: 8.5,
    emiAmount: 35000,
    tenureMonths: 240,
    emiDate: 5,
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-loan-2",
    name: "Premium Car Loan",
    outstanding: 650000,
    interestRate: 9.2,
    emiAmount: 15000,
    tenureMonths: 60,
    emiDate: 10,
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-loan-3",
    name: "Credit Card Debt",
    outstanding: 120000,
    interestRate: 24.0,
    emiAmount: 8000,
    tenureMonths: 24,
    emiDate: 25,
    createdAt: new Date().toISOString()
  },
  {
    _id: "demo-loan-4",
    name: "Education Loan",
    outstanding: 800000,
    interestRate: 6.8,
    emiAmount: 10000,
    tenureMonths: 120,
    emiDate: 1,
    createdAt: new Date().toISOString()
  }
];

const getDemoLoans = () => {
  const loans = localStorage.getItem('demo_loans');
  if (!loans) {
    localStorage.setItem('demo_loans', JSON.stringify(DEFAULT_DEMO_LOANS));
    return DEFAULT_DEMO_LOANS;
  }
  return JSON.parse(loans);
};

const saveDemoLoans = (loans) => {
  localStorage.setItem('demo_loans', JSON.stringify(loans));
};

const getAuthToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo ? userInfo.token : null;
};

const apiCall = async (endpoint, method = 'GET', body = null) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (response.status === 401 && endpoint !== '/auth/login') {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
    throw new Error('Session expired. Please log in again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  login: (credentials) => {
    if (credentials.email === 'demo@example.com') {
      const demoUser = {
        _id: 'demo-user-id',
        name: 'Demo Pilot',
        email: 'demo@example.com',
        isAdmin: false,
        reminderSettings: {
          globalEnabled: true,
          channel: 'email',
          daysBefore: 3
        },
        token: 'demo-jwt-token',
        isDemo: true
      };
      return Promise.resolve(demoUser);
    }
    return apiCall('/auth/login', 'POST', credentials);
  },
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  getUsers: () => {
    if (isDemoMode()) {
      return Promise.resolve([
        { _id: 'demo-user-id', name: 'Demo Pilot', email: 'demo@example.com', isAdmin: false },
        { _id: 'admin-user-id', name: 'System Administrator', email: 'admin@example.com', isAdmin: true }
      ]);
    }
    return apiCall('/auth/users');
  },
  updateReminders: (settings) => {
    if (isDemoMode()) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
      userInfo.reminderSettings = { ...userInfo.reminderSettings, ...settings };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return Promise.resolve({
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        isAdmin: userInfo.isAdmin,
        reminderSettings: userInfo.reminderSettings
      });
    }
    return apiCall('/auth/reminders', 'PUT', settings);
  },
  testReminder: () => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: 'Demo Mode: Mock reminder notification triggered and logged successfully!' });
        }, 500);
      });
    }
    return apiCall('/auth/test-reminder', 'POST');
  },
};

export const loanAPI = {
  getLoans: () => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getDemoLoans());
        }, 300);
      });
    }
    return apiCall('/loans');
  },
  getAdminLoans: () => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(getDemoLoans());
        }, 300);
      });
    }
    return apiCall('/loans/admin');
  },
  createLoan: (loanData) => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const loans = getDemoLoans();
          const newLoan = {
            ...loanData,
            _id: 'demo-loan-' + Date.now(),
            createdAt: new Date().toISOString()
          };
          loans.push(newLoan);
          saveDemoLoans(loans);
          resolve(newLoan);
        }, 300);
      });
    }
    return apiCall('/loans', 'POST', loanData);
  },
  updateLoan: (id, loanData) => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const loans = getDemoLoans();
          const updatedLoans = loans.map(l => {
            if ((l._id || l.id) === id) {
              return { ...l, ...loanData };
            }
            return l;
          });
          saveDemoLoans(updatedLoans);
          const updatedLoan = updatedLoans.find(l => (l._id || l.id) === id);
          resolve(updatedLoan);
        }, 300);
      });
    }
    return apiCall(`/loans/${id}`, 'PUT', loanData);
  },
  deleteLoan: (id) => {
    if (isDemoMode()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const loans = getDemoLoans();
          const filtered = loans.filter(l => (l._id || l.id) !== id);
          saveDemoLoans(filtered);
          resolve({ message: 'Loan deleted successfully' });
        }, 300);
      });
    }
    return apiCall(`/loans/${id}`, 'DELETE');
  },
};

