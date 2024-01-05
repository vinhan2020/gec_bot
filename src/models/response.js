const mongoose = require('mongoose')

const AppToResponse = mongoose.Schema({
    success: Boolean,
    errorCode: Number,
    message: String,
    data: Object,
})

module.exports = mongoose.model('AppToResponse', AppToResponse)