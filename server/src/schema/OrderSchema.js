const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  transporterName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

const Order = mongoose.model("Order", OrderSchema)

module.exports = Order
