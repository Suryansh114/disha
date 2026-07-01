import { supabase } from '../supabaseclient';

// ---------------------------------------------------------------------------
// Helper: normalise a college row (snake_case → camelCase aliases used in UI)
// ---------------------------------------------------------------------------
const normalizeCollege = (college) => ({
  ...college,
  avgPackage: college.avg_package,
  feesROI: college.fees_roi,
  admissionDifficulty: college.admission_difficulty,
  campusLife: college.campus_life,
  createdAt: college.created_at,
});

export const api = {
  // ====== USER ENDPOINTS (kept as REST calls – users stored in MongoDB) ======
  getUsers: async () => {
    const API_URL = process.env.REACT_APP_API_URL || '/api';
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  getUserById: async (id) => {
    const API_URL = process.env.REACT_APP_API_URL || '/api';
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  createUser: async (userData) => {
    const API_URL = process.env.REACT_APP_API_URL || '/api';
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (id, userData) => {
    const API_URL = process.env.REACT_APP_API_URL || '/api';
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const API_URL = process.env.REACT_APP_API_URL || '/api';
    const response = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
    return response.json();
  },

  // ====== COLLEGE ENDPOINTS (direct Supabase) ======
  getColleges: async () => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map(normalizeCollege);
  },

  getCollegeById: async (id) => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return normalizeCollege(data);
  },

  getCollegesByType: async (type) => {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map(normalizeCollege);
  },

  createCollege: async (collegeData) => {
    const { data, error } = await supabase
      .from('colleges')
      .insert([collegeData])
      .select();
    if (error) throw new Error(error.message);
    return normalizeCollege(data[0]);
  },

  updateCollege: async (id, collegeData) => {
    const { data, error } = await supabase
      .from('colleges')
      .update(collegeData)
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('College not found');
    return normalizeCollege(data[0]);
  },

  deleteCollege: async (id) => {
    const { error } = await supabase
      .from('colleges')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'College deleted successfully' };
  },

  // ====== EXAM ENDPOINTS (direct Supabase) ======
  getExams: async () => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('exam_date', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getExamById: async (id) => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  getExamsByCategory: async (category) => {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('category', category)
      .order('exam_date', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getPrepCourses: async (examId) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('exam_id', examId)
      .order('rating', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  createExam: async (examData) => {
    const { data, error } = await supabase
      .from('exams')
      .insert([examData])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  updateExam: async (id, examData) => {
    const { data, error } = await supabase
      .from('exams')
      .update(examData)
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('Exam not found');
    return data[0];
  },

  deleteExam: async (id) => {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Exam deleted successfully' };
  },

  // ====== PREP COURSES ENDPOINTS (direct Supabase) ======
  getAllPrepCourses: async () => {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .order('rating', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getPrepCoursesByExam: async (examId) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('exam_id', examId)
      .order('rating', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getPrepCoursesByProvider: async (provider) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('provider', provider)
      .order('rating', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  getPrepCoursesByType: async (type) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('type', type)
      .order('rating', { ascending: false });
    if (error) throw new Error(error.message);
    return data || [];
  },

  createPrepCourse: async (courseData) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .insert([courseData])
      .select();
    if (error) throw new Error(error.message);
    return data[0];
  },

  updatePrepCourse: async (id, courseData) => {
    const { data, error } = await supabase
      .from('prep_courses')
      .update(courseData)
      .eq('id', id)
      .select();
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('Prep course not found');
    return data[0];
  },

  deletePrepCourse: async (id) => {
    const { error } = await supabase
      .from('prep_courses')
      .delete()
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Prep course deleted successfully' };
  },
};
