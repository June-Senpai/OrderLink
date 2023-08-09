const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/mongo")
const app = express()
const http = require("http")
const server = http.createServer(app)

const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

const indexRoute = require("./routes/indexRoute")

app.use(express.json())
app.use(cors())

connectToDatabase()

app.use("/", indexRoute)

io.on("connection", (socket) => {
  console.log("a user connected")
})

server.listen(process.env.PORT, () =>
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
)
