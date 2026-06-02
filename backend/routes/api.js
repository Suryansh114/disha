const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const streamController = require('../controllers/streamController');
const courseController = require('../controllers/courseController');
const collegeController = require('../controllers/collegeController');
const examController = require('../controllers/examController');

// Example routes
router.get('/health', (req, res) => {
  res.json({ message: 'API is running' });
});

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

// College routes
router.post('/colleges', collegeController.createCollege);
router.get('/colleges', collegeController.getColleges);
router.get('/colleges/:id', collegeController.getCollegeById);
router.put('/colleges/:id', collegeController.updateCollege);
router.delete('/colleges/:id', collegeController.deleteCollege);

// Exam routes
router.post('/exams', examController.createExam);
router.get('/exams', examController.getExams);
router.get('/exams/:id', examController.getExamById);
router.put('/exams/:id', examController.updateExam);
router.delete('/exams/:id', examController.deleteExam);

module.exports = router;
