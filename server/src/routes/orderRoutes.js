const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const Order = require("../schema/OrderSchema")
const User = require("../schema/UserSchema")
const { default: mongoose } = require("mongoose")
const secret = process.env.secret

router.post("/orders", async (req, res) => {
  const { orderID, from, to, quantity, pickupAddress, transporter, user } =
    req.body

  const transporterData = await User.findOne({ _id: transporter })

  const newOrder = new Order({
    orderID,
    from,
    to,
    quantity,
    pickupAddress,
    transporter,
    user,
    transporterName: transporterData.username,
  })

  await newOrder.save()
  res.json({ message: "Order created successfully" })
})

router.get("/orders", async (req, res) => {
  const token = req.query.token
  const decodedToken = jwt.verify(token, secret)
  const { userType, id: userID } = decodedToken
  let queryObject
  switch (userType) {
    case "MANUFACTURER":
      {
        queryObject = { user: userID }
      }
      break
    case "TRANSPORTER":
      {
        queryObject = { transporter: userID }
      }
      break
  }
  const orders = await Order.find(queryObject)
  res.json(orders)
})

router.get("/orders/:orderID", async (req, res) => {
  const { orderID } = req.params
  const order = await Order.findOne({ orderID })
  res.json(order)
})

router.post("/orders/:orderID/price", async (req, res) => {
  const { orderID } = req.params
  const { price } = req.body
  const order = await Order.findOne({ orderID })
  order.price = price
  await order.save()
  res.json({ message: "Price updated successfully", price })
})

// router.patch("/orders/:orderID", async (req, res) => {
//   const { orderID } = req.params
//   const { price } = req.body
//   await Order.updateOne({ orderID }, { price })
//   res.json({ message: "Price updated successfully" })
// })

router.get("/transporters", async (req, res) => {
  try {
    const transporters = await User.find(
      { userType: "TRANSPORTER" },
      "_id username"
    )

    res.json(transporters)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/orders/ids", async (req, res) => {
  try {
    const orderIDs = await Order.distinct("orderID")
    res.json(orderIDs)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports.orderRouter = router
