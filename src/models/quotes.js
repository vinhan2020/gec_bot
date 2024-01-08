const mongoose = require('mongoose')

const Quote = mongoose.Schema({
    quoteTwitterLink:
    {
        type: String,
        default: ''
    },
    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('quote', Quote)