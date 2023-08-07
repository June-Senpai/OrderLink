const express = require("express")
const router = express.Router()

const Message = require("../schema/MessageSchema")

router.post("/", async (req, res) => {
  const { orderID, sender, content } = req.body
  const newMessage = new Message({ orderID, sender, content })
  await newMessage.save()
  res.json({ message: "Message sent successfully" })
})

router.get("/:orderID", async (req, res) => {
  const { orderID } = req.params
  const messages = await Message.find({ orderID })
  res.json(messages)
})

module.exports.messageRouter = router
