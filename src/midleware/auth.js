const jwt = require('jsonwebtoken')
const consts = require('../utils/const')
const { returnError, returnSuccess } = require('../utils/response/responseHandler')

function authenticateAccessToken(req, res, next) {
    const authHeaders = req.headers['authorization']
    if (!authHeaders) {
        return returnError(req, res, "You mush put token to header", consts.httpStatusCodes.BAD_REQUEST, null)
    }
    const token = authHeaders.split(' ')[1]
    if (!token) {
        return returnError(req, res, "Token Invalid", consts.httpStatusCodes.BAD_REQUEST, null)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return returnError(req, res, "Permision Denied", consts.httpStatusCodes.FORBITDENT, err)
        }
        req.user = user
    })
    next()
}
function generateAccesToken(userName, password) {
    console.log("ACCESS_TOKEN_SECRET", process.env.ACCESS_TOKEN_SECRET)
    return jwt.sign({ userName, password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}

module.exports = {
    authenticateAccessToken,
    generateAccesToken
}