const Task = require('../models/task')
const { returnSuccess, returnError } = require('../utils/response/responseHandler')
const consts = require('../utils/const')
class TaskController {
    async AddTask(req, res, next) {
        const { quoteTwitterLink } = req.body
        if (!quoteTwitterLink) {
            return returnError(req, res, "Missing quoteTwitterLink", consts.httpStatusCodes.NOT_FOUND, null)
        }

        await Task.find()
            .then(async taskList => {
                console.log("taskList", taskList)
                if (taskList.length === 0) {
                    // create new task
                    const newTask = new Task({
                        currentTask: [
                            {
                                quoteTwitterLink
                            }
                        ]
                    })
                    await newTask.save()
                        .then(() => {
                            return returnSuccess(req, res, "Create new task success", consts.httpStatusCodes.OK, null)
                        })
                        .catch(err => {
                            return returnError(req, res, "Create new task failed", consts.httpStatusCodes.NOT_FOUND, err)
                        })
                } else {
                    // push into current task list
                    await Task.findOne({ "currentTask.quoteTwitterLink": { $regex: new RegExp(quoteTwitterLink, 'i') } })
                        .then(async dataTask => {
                            if (!dataTask) {
                                await Task.updateOne({ _id: taskList[0]._id }, {
                                    $push: {
                                        'currentTask': {
                                            quoteTwitterLink: quoteTwitterLink
                                        }
                                    }
                                })
                                    .then(() => {
                                        return returnSuccess(req, res, "Update task successfully", consts.httpStatusCodes.OK, null)
                                    })
                                    .catch(err => {
                                        return returnError(req, res, "Update task failed", consts.httpStatusCodes.OK, err)
                                    })
                            } else {
                                return returnError(req, res, "Task already existed", consts.httpStatusCodes.OK, null)
                            }
                        })
                }

            })
    }

    async RemoveTask(req, res, next) {
        const { quoteTwitterLink } = req.body
        console.log("quoteTwitterLink", quoteTwitterLink)
        if (!quoteTwitterLink) {
            return returnError(req, res, "Missing quoteTwitterLink", consts.httpStatusCodes.NOT_FOUND, null)
        }

        await Task.findOne({ "currentTask.quoteTwitterLink": quoteTwitterLink })
            .then(async data => {
                console.log("data", data)
                if (!data) {
                    return returnError(req, res, "quoteTwitterLink not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                await Task.updateOne({ _id: data._id }, {
                    "$pull": {
                        "currentTask": {
                            quoteTwitterLink
                        }
                    }
                })
                    .then(dataUpdate => {
                        console.log("dataUpdate", dataUpdate)
                    })
            })
    }
}

module.exports = new TaskController()