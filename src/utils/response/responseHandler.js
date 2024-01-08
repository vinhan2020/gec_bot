const AppToResponse = require('../../models/response')

function returnError(req, res, errMessage, code, data) {
    const respModel = new AppToResponse({
        success: false,
        message: errMessage,
        errorCode: code,
        data: data,
    })
    res.status(code).json(respModel)
}

function returnSuccess(req, res, errMessage, code, data) {
    const respModel = new AppToResponse({
        success: true,
        message: errMessage,
        errorCode: code,
        data: data,
    })
    res.status(code).json(respModel)
}

module.exports = { returnError, returnSuccess }