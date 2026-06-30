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
  verifyCertificate,
  updateCertificateOverride,
  updateAllCertificateOverrides,
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/password', protect, updatePassword);
router.get('/users', protect, admin, getUsers);
router.post('/users', protect, admin, createUser);
router.delete('/users/:id', protect, admin, deleteUser);
router.put('/users/:id/status', protect, admin, updateUserStatus);
router.put('/users/:id', protect, admin, updateUser);

// Public verification route
router.get('/verify-certificate/:certId', verifyCertificate);

// Admin certificate override routes
router.put('/users/:id/certificate-override', protect, admin, updateCertificateOverride);
router.post('/users/certificate-override-all', protect, admin, updateAllCertificateOverrides);

module.exports = router;
