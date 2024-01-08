const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
router.post('/create', userController.CreateUser);

module.exports = router
