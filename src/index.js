const express = require('express')
const app = express()
// const route = require('./routes')
const db = require('./config/db')
const cors = require('cors')
const port = 8080
const corsOption = {
    "origin": "*",
    "methods": "POST,HEAD,PUT,GET,PATCH,DELETE",
}
const { botControl } = require('./botTele/botControll')
db.connect()
app.use(cors(corsOption))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
// route(app)

// error handling middleware
app.use((err, res, req, next) => {
    console.error("An error:", err.message)
    res.status(500).send('Something went wrong')
})
// handle error global
process.on('uncaughtException', (err, origin) => {
    console.log(err)
});

app.listen(port, () => {
    botControl()
    console.log(`Example app listening at http://localhost:${port}`)
})
