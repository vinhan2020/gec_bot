const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admin')
const { authenticateAccessToken } = require('../midleware/auth')
router.post('/register', adminController.Register);
router.post('/login', authenticateAccessToken, adminController.Login);

module.exports = router
