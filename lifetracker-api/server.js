const express = require("express") // import express
const app = express() // create our app 
const morgan = require("morgan")
const cors = require("cors")

// mount the middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})