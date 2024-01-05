const mongoose = require('mongoose')

const User = mongoose.Schema({
    userId: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    twitterName: {
        type: String,
        default: ''
    },
    referralCode: {
        type: String,
        default: ''
    },
    pointRef: {
        type: Number,
        default: 0
    },
    walletAddress: {
        type: String,
        default: ''
    },
    quoteLinks: [
        {
            link: {
                type: String,
                default: ''
            }
        }
    ]
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('user', User)