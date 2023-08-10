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
  senderType: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  receiverName: {
    type: String,
    required: true,
  },
  senderName: {
    type: String,
    required: true,
  },
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
