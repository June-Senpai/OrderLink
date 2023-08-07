const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")

dotenv.config()
const router = express.Router()
const secret = process.env.secret

const User = require("../schema/UserSchema")

router.post("/register/user", async (req, res) => {
  const { username, password, userType, address } = req.body
  const user = await User.findOne({ username })

  if (user) {
    return res.json({ message: "user already exists" })
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    username,
    password: hashedPassword,
    userType,
    address,
  })
  await newUser.save()
  res.json({ message: "user registered successfully" })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user) {
    return res.json({ message: "user doesn't exist" })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.json({
      message: "username or password incorrect try again!",
    })
  }

  const token = jwt.sign({ id: user._id }, secret)
  res.json({ token, userID: user._id })
})

module.exports.userRouter = router

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, secret, (err) => {
      if (err) return res.sendStatus(403)
      next()
    })
  } else {
    res.sendStatus(401)
  }
}
