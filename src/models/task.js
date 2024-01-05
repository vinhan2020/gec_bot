const mongoose = require('mongoose')

const Task = mongoose.Schema({
    quoteTwitterLink: {
        type: String,
        default: ''
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('task', Task)