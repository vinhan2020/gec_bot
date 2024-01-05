const mongoose = require('mongoose')

async function connect() {
    try {
        mongoose.set('strictQuery', false)
        var connString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
        if (process.env.DB_URL) {
            connString = process.env.DB_URL
        }
        console.log("connString", connString)
        await mongoose.connect(connString)
        console.log('Connect DB Successfully!!!')
    } catch {
        console.log('Connect DB Failure!!!')
    }
}

module.exports = { connect }
