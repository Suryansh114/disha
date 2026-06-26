const API_URL = process.env.REACT_APP_API_URL || '/api';

export const api = {
  // ====== USER ENDPOINTS ======
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
  },

  // ====== COLLEGE ENDPOINTS (Supabase) ======
  getColleges: async () => {
    const response = await fetch(`${API_URL}/colleges`);
    if (!response.ok) throw new Error('Failed to fetch colleges');
    return response.json();
  },

  getCollegeById: async (id) => {
    const response = await fetch(`${API_URL}/colleges/${id}`);
    if (!response.ok) throw new Error('Failed to fetch college');
    return response.json();
  },

  getCollegesByType: async (type) => {
    const response = await fetch(`${API_URL}/colleges/type/${type}`);
    if (!response.ok) throw new Error('Failed to fetch colleges by type');
    return response.json();
  },

  createCollege: async (collegeData) => {
    const response = await fetch(`${API_URL}/colleges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collegeData)
    });
    return response.json();
  },

  updateCollege: async (id, collegeData) => {
    const response = await fetch(`${API_URL}/colleges/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(collegeData)
    });
    return response.json();
  },

  deleteCollege: async (id) => {
    const response = await fetch(`${API_URL}/colleges/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // ====== EXAM ENDPOINTS (Supabase) ======
  getExams: async () => {
    const response = await fetch(`${API_URL}/exams`);
    if (!response.ok) throw new Error('Failed to fetch exams');
    return response.json();
  },

  getExamById: async (id) => {
    const response = await fetch(`${API_URL}/exams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch exam');
    return response.json();
  },

  getExamsByCategory: async (category) => {
    const response = await fetch(`${API_URL}/exams/category/${category}`);
    if (!response.ok) throw new Error('Failed to fetch exams by category');
    return response.json();
  },

  getPrepCourses: async (examId) => {
    const response = await fetch(`${API_URL}/exams/${examId}/prep-courses`);
    if (!response.ok) throw new Error('Failed to fetch prep courses');
    return response.json();
  },

  createExam: async (examData) => {
    const response = await fetch(`${API_URL}/exams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examData)
    });
    return response.json();
  },

  updateExam: async (id, examData) => {
    const response = await fetch(`${API_URL}/exams/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examData)
    });
    return response.json();
  },

  deleteExam: async (id) => {
    const response = await fetch(`${API_URL}/exams/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  // ====== PREP COURSES ENDPOINTS (Supabase) ======
  getAllPrepCourses: async () => {
    const response = await fetch(`${API_URL}/prep-courses`);
    if (!response.ok) throw new Error('Failed to fetch prep courses');
    return response.json();
  },

  getPrepCoursesByExam: async (examId) => {
    const response = await fetch(`${API_URL}/prep-courses/exam/${examId}`);
    if (!response.ok) throw new Error('Failed to fetch prep courses');
    return response.json();
  },

  getPrepCoursesByProvider: async (provider) => {
    const response = await fetch(`${API_URL}/prep-courses/provider?provider=${provider}`);
    if (!response.ok) throw new Error('Failed to fetch prep courses');
    return response.json();
  },

  getPrepCoursesByType: async (type) => {
    const response = await fetch(`${API_URL}/prep-courses/type?type=${type}`);
    if (!response.ok) throw new Error('Failed to fetch prep courses');
    return response.json();
  },

  createPrepCourse: async (courseData) => {
    const response = await fetch(`${API_URL}/prep-courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData)
    });
    return response.json();
  },

  updatePrepCourse: async (id, courseData) => {
    const response = await fetch(`${API_URL}/prep-courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(courseData)
    });
    return response.json();
  },

  deletePrepCourse: async (id) => {
    const response = await fetch(`${API_URL}/prep-courses/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

