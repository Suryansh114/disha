const { supabase } = require('../supabaseClient');

const normalizeCollege = (college) => ({
  ...college,
  avgPackage: college.avg_package,
  feesROI: college.fees_roi,
  admissionDifficulty: college.admission_difficulty,
  campusLife: college.campus_life,
  createdAt: college.created_at,
});

// Get all colleges
exports.getColleges = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json((data || []).map(normalizeCollege));
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get college by ID
exports.getCollegeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'College not found' });

    res.json(normalizeCollege(data));
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get colleges by type
exports.getCollegesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json((data || []).map(normalizeCollege));
  } catch (error) {
    console.error('Error fetching colleges by type:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create college (admin only)
exports.createCollege = async (req, res) => {
  try {
    const { id, name, type, state, icon, fees, avg_package, exams, streams, placements, campus_life, research, culture, fees_roi, admission_difficulty, infrastructure } = req.body;

    const { data, error } = await supabase
      .from('colleges')
      .insert([{
        id,
        name,
        type,
        state,
        icon,
        fees,
        avg_package,
        exams: exams || [],
        streams: streams || [],
        placements,
        campus_life,
        research,
        culture,
        fees_roi,
        admission_difficulty,
        infrastructure
      }])
      .select();

    if (error) throw error;

    res.status(201).json(normalizeCollege(data[0]));
  } catch (error) {
    console.error('Error creating college:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update college (admin only)
exports.updateCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('colleges')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ message: 'College not found' });

    res.json(normalizeCollege(data[0]));
  } catch (error) {
    console.error('Error updating college:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete college (admin only)
exports.deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('colleges')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Error deleting college:', error);
    res.status(500).json({ message: error.message });
  }
};
