const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: ["TRANSPORTER", "MANUFACTURER"],
    required: true,
  },
})

const User = mongoose.model("User", UserSchema)

module.exports = User
