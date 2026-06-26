const { supabase } = require('../supabaseClient');

// Get all prep courses
exports.getPrepCourses = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .order('rating', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching prep courses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get prep courses for a specific exam
exports.getPrepCoursesByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('exam_id', examId)
      .order('rating', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching prep courses by exam:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get prep courses by provider (YouTube or Udemy)
exports.getPrepCoursesByProvider = async (req, res) => {
  try {
    const { provider } = req.query;
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('provider', provider)
      .order('rating', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching prep courses by provider:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get prep courses by type (Free or Paid)
exports.getPrepCoursesByType = async (req, res) => {
  try {
    const { type } = req.query;
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('type', type)
      .order('rating', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching prep courses by type:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create prep course (admin only)
exports.createPrepCourse = async (req, res) => {
  try {
    const { exam_id, title, provider, url, instructor, type, rating } = req.body;

    const { data, error } = await supabase
      .from('prep_courses')
      .insert([{
        exam_id,
        title,
        provider,
        url,
        instructor,
        type: type || 'Free',
        rating
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating prep course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update prep course (admin only)
exports.updatePrepCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('prep_courses')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ message: 'Prep course not found' });

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating prep course:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete prep course (admin only)
exports.deletePrepCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('prep_courses')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Prep course deleted successfully' });
  } catch (error) {
    console.error('Error deleting prep course:', error);
    res.status(500).json({ message: error.message });
  }
};
