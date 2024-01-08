const Quotes = require('../models/quotes')
const Task = require('../models/task')
const { returnError, returnSuccess } = require('../utils/response/responseHandler')
const consts = require('../utils/const')
class QuoteController {
    async AddQuote(req, res, next) {
        const { quoteTwitterLink } = req.body
        if (!quoteTwitterLink) {
            return returnError(req, res, "Missing quoteTwitterLink", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await Quotes.findOne({ quoteTwitterLink: { $regex: new RegExp(quoteTwitterLink) } })
            .then(async dataQuote => {
                if (dataQuote) {
                    return returnError(req, res, "Quote quoteTwitterLink already exist", consts.httpStatusCodes.OK, null)
                }
                const newQuote = new Quotes({
                    quoteTwitterLink
                })
                await newQuote.save()
                    .then((data) => {
                        return returnSuccess(req, res, "Create Quote successfully", consts.httpStatusCodes.OK, data)
                    })
                    .catch(err => {
                        return returnError(req, res, "Create Quote failed", consts.httpStatusCodes.OK, err)
                    })
            })
            .catch(err => {
                return returnError(req, res, "Something went wrong Quote", consts.httpStatusCodes.BAD_REQUEST, err)
            })
    }

    async UpdateQuote(req, res, next) {
        try {
            const { _id } = req.body
            if (!_id) {
                return returnError(req, res, "Missing _id", consts.httpStatusCodes.NOT_FOUND, null)
            }
            await Quotes.findOne({ _id })
                .then(async dataQuote => {
                    console.log("dataQuote", dataQuote)
                    if (!dataQuote) {
                        return returnError(req, res, "Quote not found", consts.httpStatusCodes.BAD_REQUEST, null)
                    }
                    const updateQuote = await Quotes.findOneAndUpdate({ _id }, {
                        $set: {
                            status: !dataQuote.status
                        }
                    })
                    return returnSuccess(req, res, "Update Quote successfully", consts.httpStatusCodes.OK, updateQuote)
                })
        }
        catch (err) {
            return returnError(req, res, "Update Quote failed", consts.httpStatusCodes.BAD_REQUEST, err)
        }
    }

    async DeleteQuote(req, res, next) {
        const { _id } = req.body
        if (!_id) {
            return returnError(req, res, "Missing _id", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await Quotes.findOneAndDelete({ _id })
            .then(() => {
                return returnSuccess(req, res, "Delete quote successfully", consts.httpStatusCodes.OK, null)
            })
            .catch(err => {
                return returnError(req, res, "Delete quote failed", consts.httpStatusCodes.BAD_REQUEST, err)
            })
    }

    async ListQuote(req, res, next) {
        await Quotes.find()
            .then(listQuotes => {
                if (listQuotes.length > 0) {
                    return returnSuccess(req, res, "List Quotes", consts.httpStatusCodes.OK, listQuotes)
                } else {
                    return returnSuccess(req, res, "No data", consts.httpStatusCodes.OK, null)
                }
            })
            .catch(err => {
                return returnError(req, res, "Get list quotes failed", consts.httpStatusCodes.BAD_REQUEST, err)
            })
    }
}

module.exports = new QuoteController()