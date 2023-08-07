const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
