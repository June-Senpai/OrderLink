const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const Order = require("../schema/OrderSchema")
const User = require("../schema/UserSchema")
const { default: mongoose } = require("mongoose")
const secret = process.env.secret

router.post("/orders", async (req, res) => {
  try {
    const { orderID, from, to, quantity, pickupAddress, transporter, user } =
      req.body

    const io = req.app.get("io")

    console.log({ io })

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
    const socketRoom = `${user} ${transporter}`
    io.in(socketRoom).emit("orderCreated", newOrder)
    res.json({ message: "Order created successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/orders", async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.get("/orders/:orderID", async (req, res) => {
  try {
    const { orderID } = req.params
    const order = await Order.findOne({ orderID })
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

router.post("/orders/:orderID/price", async (req, res) => {
  try {
    const { orderID } = req.params
    const { price } = req.body
    const io = req.app.get("io")
    const order = await Order.findOne({ orderID })
    order.price = price
    await order.save()
    const socketRoom = `${order.user} ${order.transporter}`
    io.in(socketRoom).emit("priceUpdated", order)
    res.json({ message: "Price updated successfully", price })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

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
