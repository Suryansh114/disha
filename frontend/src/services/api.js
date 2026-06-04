const API_URL = process.env.REACT_APP_API_URL || '/api';

export const api = {
  // User endpoints
  getUsers: async () => {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  getUserById: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};
