const express = require('express');
const { register, login, getMe, updateProfile, deleteAccount } = require('../controllers/auth.controller');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/edit-profile', protect, updateProfile);
router.delete('/delete-account', protect, deleteAccount);

module.exports = router;