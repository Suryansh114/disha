const { supabase } = require('../supabaseClient');

// Get all exams
exports.getExams = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .order('exam_date', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get exam by ID
exports.getExamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Exam not found' });

    res.json(data);
  } catch (error) {
    console.error('Error fetching exam:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get exams by category
exports.getExamsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('category', category)
      .order('exam_date', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching exams by category:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get prep courses for an exam
exports.getPrepCourses = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('prep_courses')
      .select('*')
      .eq('exam_id', id)
      .order('rating', { ascending: false });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching prep courses:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create exam (admin only)
exports.createExam = async (req, res) => {
  try {
    const { id, name, category, description, exam_date, result_date, status, website } = req.body;

    const { data, error } = await supabase
      .from('exams')
      .insert([{
        id,
        name,
        category,
        description,
        exam_date,
        result_date,
        status: status || 'Upcoming',
        website
      }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating exam:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update exam (admin only)
exports.updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('exams')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ message: 'Exam not found' });

    res.json(data[0]);
  } catch (error) {
    console.error('Error updating exam:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete exam (admin only)
exports.deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    console.error('Error deleting exam:', error);
    res.status(500).json({ message: error.message });
  }
};
