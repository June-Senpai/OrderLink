const express = require("express")
const router = express.Router()

const { userRouter } = require("./userRoutes")
const { orderRouter } = require("./orderRoutes")
const { messageRouter } = require("./messageRoutes")

router.use("/users", userRouter)
router.use("/orders", orderRouter)
router.use("/messages", messageRouter)

module.exports = router
