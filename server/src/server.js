const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectToDatabase = require("./config/mongo")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const Message = require("./schema/MessageSchema")

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

const indexRoute = require("./routes/indexRoute")

app.use(express.json())

connectToDatabase()

app.use("/", indexRoute)

io.on("connection", (socket) => {
  console.log("a user connected")

  socket.on("send_message", async (data) => {
    console.log({ data })

    const msg = new Message(data)
    io.in(data.room).emit("receive_message", {
      id: msg._id,
      msg: msg.content,
      ...msg._doc,
    })
    await msg.save()
  })

  socket.on("joinRooms", (rooms) => {
    rooms.forEach((room) => {
      socket.join(room)
    })
  })
})
app.set("io", io)

server.listen(process.env.PORT, () =>
  console.log(`Listening on port http://localhost:${process.env.PORT}`)
)
