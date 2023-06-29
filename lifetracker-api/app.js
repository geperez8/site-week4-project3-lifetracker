const express = require("express") // import express
const app = express() // create our app 
const morgan = require("morgan")
const cors = require("cors")
const {NotFoundError} = require("./utils/errors")


// mount the middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

//routes
app.get("/", (req, res) => {
    res.json({"message": "server works"})
})

app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message

    return res.status(status).json({
        error: {message, status}
    })
})

module.exports = app