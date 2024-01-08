const userRouter = require('./user')
const adminRouter = require('./admin')
const quoteRouter = require('./quotes')
const taskRouter = require('./task')
function route(app) {
    app.use('/user', userRouter)
    app.use('/admin', adminRouter)
    app.use('/quote', quoteRouter)
    app.use('/task', taskRouter)

}
module.exports = route 