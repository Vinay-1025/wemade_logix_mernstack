const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  createUser,
  deleteUser,
  updateUserStatus,
  updateUser,
  updatePassword,
  refreshAccessToken,
  logoutUser,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/password', protect, updatePassword);
router.get('/users', protect, admin, getUsers);
router.post('/users', protect, admin, createUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.put('/users/:id/status', protect, admin, updateUserStatus);
router.put('/users/:id', protect, admin, updateUser);

module.exports = router;
