const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/mongo")

const indexRoute = require("./routes/indexRoute")

const app = express()

app.use(express.json())
app.use(cors())

connectToDatabase()

app.use("/", indexRoute)

app.listen(process.env.PORT, () =>
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
)
