const { returnError, returnSuccess } = require('../utils/response/responseHandler')
const Task = require('../models/task')
class TaskController {
    async CreateTask(req, res, next) {
        const { quoteTwitterLink } = req.body
        if (!quoteTwitterLink) {
            return returnSuccess(req, res, "Missing quoteTwitterLink", consts.httpStatusCodes.OK, null)
        }
        await Task.findOne({ quoteTwitterLink })
            .then(async dataTask => {
                if (dataTask) {
                    return returnSuccess(req, res, "Quote link already exist", consts.httpStatusCodes.OK, null)
                }
                const newQuote = new Task({
                    quoteTwitterLink
                })
                await newQuote.save()
                    .then((data) => {
                        return returnSuccess(req, res, "Create Task successfully", consts.httpStatusCodes.OK, data)
                    })
                    .catch(err => {
                        return returnSuccess(req, res, "Create Task failed", consts.httpStatusCodes.OK, err)
                    })
            })
            .catch(err => {
                return returnSuccess(req, res, "Something went wrong Task", consts.httpStatusCodes.OK, err)
            })
    }
}

module.exports = new TaskController()