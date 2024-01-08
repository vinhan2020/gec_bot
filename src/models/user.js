const mongoose = require('mongoose')

const User = mongoose.Schema({
    userId: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    userName: {
        type: String,
        default: ''
    },
    referredBy: {
        type: String,
        default: ''
    },
    peopleInvited: {
        type: Number,
        default: 0
    },
    twitterName: {
        type: String,
        default: ''
    },
    referralCode: {
        type: String,
        default: ''
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
    ],
    point: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('user', User)