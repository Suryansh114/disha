const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Example routes
router.get('/health', (req, res) => {
  res.json({ message: 'API is running' });
});

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
