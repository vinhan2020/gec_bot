const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quotes')
router.get('/list', quoteController.ListQuote);
router.post('/add', quoteController.AddQuote);
router.put('/update', quoteController.UpdateQuote);
router.delete('/delete', quoteController.DeleteQuote);

module.exports = router
