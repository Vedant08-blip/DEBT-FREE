const API_URL = 'http://127.0.0.1:5052/api';

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
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

export const authAPI = {
  login: (credentials) => apiCall('/auth/login', 'POST', credentials),
  register: (userData) => apiCall('/auth/register', 'POST', userData),
  getUsers: () => apiCall('/auth/users'),
  updateReminders: (settings) => apiCall('/auth/reminders', 'PUT', settings),
};

export const loanAPI = {
  getLoans: () => apiCall('/loans'),
  getAdminLoans: () => apiCall('/loans/admin'),
  createLoan: (loanData) => apiCall('/loans', 'POST', loanData),
  updateLoan: (id, loanData) => apiCall(`/loans/${id}`, 'PUT', loanData),
  deleteLoan: (id) => apiCall(`/loans/${id}`, 'DELETE'),
};
