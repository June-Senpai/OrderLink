const express = require("express")
const router = express.Router()

const Order = require("../schema/OrderSchema")

router.post("/orders", async (req, res) => {
  const { orderID, from, to, quantity, pickupAddress, transporter } = req.body
  const newOrder = new Order({
    orderID,
    from,
    to,
    quantity,
    pickupAddress,
    transporter,
  })
  await newOrder.save()
  res.json({ message: "Order created successfully" })
})

router.get("/orders", async (req, res) => {
  const orders = await Order.find()
  res.json(orders)
})

router.get("/orders/:orderID", async (req, res) => {
  const { orderID } = req.params
  const order = await Order.findOne({ orderID })
  res.json(order)
})

module.exports.orderRouter = router
