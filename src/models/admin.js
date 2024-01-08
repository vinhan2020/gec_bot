const mongoose = require('mongoose')

const Admin = mongoose.Schema({
    userName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    jwtToken : {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Admin', Admin)