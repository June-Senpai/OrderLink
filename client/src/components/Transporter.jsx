import React, { useState } from "react"
import io from "socket.io-client"

const Transporter = () => {
  const [orderID, setOrderID] = useState("")
  const [price, setPrice] = useState("")

  const socket = io()

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("newPrice", { orderID, price })
    setOrderID("")
    setPrice("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order ID:
        <select value={orderID} onChange={(e) => setOrderID(e.target.value)}>
          <option value="order1">Order 1</option>
          <option value="order2">Order 2</option>
        </select>
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Transporter
