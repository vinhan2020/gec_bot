const { returnError, returnSuccess } = require('../utils/response/responseHandler')
const consts = require('../utils/const')
const User = require('../models/user')

class UserController {
    async CreateUser(req, res, next) {
        const { userId, userNane } = req.body
        if (!userId) {
            return returnError(req, res, "Missing userId", consts.httpStatusCodes.BAD_REQUEST, null)
        }
        if (!userNane) {
            return returnError(req, res, "Missing userNane", consts.httpStatusCodes.BAD_REQUEST, null)
        }

        await User.findOne({ userId })
            .then(async (dataUser) => {
                if (dataUser) {
                    return returnSuccess(req, res, "User already exist", consts.httpStatusCodes.OK, null)
                }
                const referralCode = `${process.env.BOT_TELE_LINK}?start=${userId}`
                const newUser = new User({
                    userId,
                    userNane,
                    referralCode
                })
                await newUser.save()
                    .then(() => {
                        return returnSuccess(req, res, "Create user successfully", consts.httpStatusCodes.OK, newUser)
                    })
                    .catch(err => {
                        return returnError(req, res, "Create user failed", consts.httpStatusCodes.BAD_REQUEST, err)
                    })
            })
    }

    async UpdateUser(req, res, next) {
        const { userId, twitterName, walletAddress, point } = req.body
        if (!userId) {
            return returnSuccess(req, res, "Missing userId", consts.httpStatusCodes.OK, null)
        }
        if (!twitterName) {
            return returnSuccess(req, res, "Missing twitterName", consts.httpStatusCodes.OK, null)
        }
        if (!walletAddress) {
            return returnSuccess(req, res, "Missing walletAddress", consts.httpStatusCodes.OK, null)
        }
        if (!point) {
            return returnSuccess(req, res, "Missing point", consts.httpStatusCodes.OK, null)
        }
        await User.finonean({ userId })
            .then(async (dataUser) => {
                if (!dataUser) {
                    return returnSuccess(req, res, "User not found", consts.httpStatusCodes.OK, null)
                }
                let newUser = { ...dataUser._doc }

                if (twitterName !== '' && twitterName !== undefined) {
                    newUser.twitterName = twitterName
                }
                if (walletAddress !== '' && walletAddress !== undefined) {
                    newUser.walletAddress = walletAddress
                }
                if (point !== undefined) {
                    newUser.point = point
                }
                await User.updateOne({ userId }, { '$set': newUser })
                    .then(() => {
                        return returnSuccess(req, res, `User was updated`, consts.httpStatusCodes.OK, null)
                    })
                    .catch(err => {
                        return returnSuccess(req, res, "Update failed", consts.httpStatusCodes.OK, err)
                    })
            })

    }
}

module.exports = new UserController()
