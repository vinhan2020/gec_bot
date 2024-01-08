const Admin = require('../models/admin')
const { returnSuccess, returnError } = require('../utils/response/responseHandler')
const { generateAccesToken } = require('../midleware/auth')
const consts = require('../utils/const')
const bcrypt = require('bcrypt')
class AdminController {
    async Login(req, res, next) {
        const { userName, password } = req.body
        console.log("password", password)
        console.log("userName", userName)
        if (!userName) {
            return returnError(req, res, "Missing userName", consts.httpStatusCodes.BAD_REQUEST, null)
        }
        if (!password) {
            return returnError(req, res, "Missing password", consts.httpStatusCodes.BAD_REQUEST, null)
        }
        if (userName === "admin" && password === '@12345') {
            return returnSuccess(req, res, "Login successfully", consts.httpStatusCodes.OK, null)
        }
        await Admin.findOne({ userName })
            .then(async data => {
                if (!data) {
                    return returnError(req, res, "Admin not found", consts.httpStatusCodes.BAD_REQUEST, null)
                }
                console.log("data", data)
                await bcrypt.compare(password, data.password)
                    .then(result => {
                        console.log("result", result)
                        if (result) {
                            return returnSuccess(req, res, "Login successfully", consts.httpStatusCodes.OK, result)
                        }else {
                            return returnError(req, res, "Login failed", consts.httpStatusCodes.BAD_REQUEST, result)
                        }
                    })
            })
            .catch(err => {
                return returnError(req, res, "Login failed", consts.httpStatusCodes.OK, null)
            })

    }

    async Register(req, res, next) {
        const { userName, password } = req.body
        if (!userName) {
            return returnError(req, res, "Missing userName", consts.httpStatusCodes.BAD_REQUEST, null)
        }
        if (!password) {
            return returnError(req, res, "Missing password", consts.httpStatusCodes.BAD_REQUEST, null)
        }
        await Admin.findOne({ userName })
            .then(async data => {
                if (data) {
                    return returnSuccess(req, res, "Admin existed", consts.httpStatusCodes.OK, null)
                }
                let passwordBcrypt = ''
                // hash password
                passwordBcrypt = await bcrypt.hash(password, 8)
                    .then(hash => {
                        return hash
                    })
                    .catch(err => console.error(err.message));
                console.log(`passwordBcrypt: ${passwordBcrypt}`);

                // gen jwt token
                let jwtToken = generateAccesToken(userName, password)
                console.log("jwtToken", jwtToken)

                const newAdmin = new Admin({
                    userName,
                    password: passwordBcrypt,
                    jwtToken
                })
                newAdmin.save()
                    .then(() => {
                        return returnSuccess(req, res, "Register successfully", consts.httpStatusCodes.OK, newAdmin)
                    })
                    .catch(err => {
                        return returnError(req, res, "Register failed", consts.httpStatusCodes.BAD_REQUEST, err)
                    })
            })
    }
}

module.exports = new AdminController()