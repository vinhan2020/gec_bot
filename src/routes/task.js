const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')
router.post('/add', taskController.AddTask);
router.post('/remove', taskController.RemoveTask);

module.exports = router
