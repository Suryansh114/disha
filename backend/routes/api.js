const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const streamController = require('../controllers/streamController');
const courseController = require('../controllers/courseController');
const collegeController = require('../controllers/collegeController');
const examController = require('../controllers/examController');

// Supabase controllers (read from Supabase)
const collegeControllerSupabase = require('../controllers/collegeControllerSupabase');
const examControllerSupabase = require('../controllers/examControllerSupabase');
const prepCoursesControllerSupabase = require('../controllers/prepCoursesControllerSupabase');

// Example routes
router.get('/health', (req, res) => {
  res.json({ message: 'API is running' });
});

// ====== SUPABASE ROUTES (Primary) ======

// College routes (Supabase)
router.get('/colleges', collegeControllerSupabase.getColleges);
router.get('/colleges/type/:type', collegeControllerSupabase.getCollegesByType);
router.get('/colleges/:id', collegeControllerSupabase.getCollegeById);
router.post('/colleges', collegeControllerSupabase.createCollege);
router.put('/colleges/:id', collegeControllerSupabase.updateCollege);
router.delete('/colleges/:id', collegeControllerSupabase.deleteCollege);

// Exam routes (Supabase)
router.get('/exams', examControllerSupabase.getExams);
router.get('/exams/category/:category', examControllerSupabase.getExamsByCategory);
router.get('/exams/:id', examControllerSupabase.getExamById);
router.get('/exams/:id/prep-courses', examControllerSupabase.getPrepCourses);
router.post('/exams', examControllerSupabase.createExam);
router.put('/exams/:id', examControllerSupabase.updateExam);
router.delete('/exams/:id', examControllerSupabase.deleteExam);

// Prep Courses routes (Supabase)
router.get('/prep-courses', prepCoursesControllerSupabase.getPrepCourses);
router.get('/prep-courses/exam/:examId', prepCoursesControllerSupabase.getPrepCoursesByExam);
router.get('/prep-courses/provider', prepCoursesControllerSupabase.getPrepCoursesByProvider);
router.get('/prep-courses/type', prepCoursesControllerSupabase.getPrepCoursesByType);
router.post('/prep-courses', prepCoursesControllerSupabase.createPrepCourse);
router.put('/prep-courses/:id', prepCoursesControllerSupabase.updatePrepCourse);
router.delete('/prep-courses/:id', prepCoursesControllerSupabase.deletePrepCourse);

// ====== LEGACY ROUTES (MongoDB - keeping for backward compatibility) ======

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

// Stream routes
router.post('/streams', streamController.createStream);
router.get('/streams', streamController.getStreams);
router.get('/streams/:id', streamController.getStreamById);
router.put('/streams/:id', streamController.updateStream);
router.delete('/streams/:id', streamController.deleteStream);

// Course routes
router.post('/courses', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/courses/:id', courseController.getCourseById);
router.put('/courses/:id', courseController.updateCourse);
router.delete('/courses/:id', courseController.deleteCourse);

module.exports = router;
