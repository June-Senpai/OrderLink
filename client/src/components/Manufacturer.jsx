import React, { useState } from "react"
import io from "socket.io-client"

const Manufacturer = () => {
  const [orderID, setOrderID] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [quantity, setQuantity] = useState("")
  const [pickup, setPickup] = useState("")
  const [transporter, setTransporter] = useState("")

  const socket = io()

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("newOrder", {
      orderID,
      from,
      to,
      quantity,
      pickup,
      transporter,
    })
    setOrderID("")
    setFrom("")
    setTo("")
    setQuantity("")
    setPickup("")
    setTransporter("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order ID:
        <input
          type="text"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
        />
      </label>
      <br />
      <label>
        From:
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </label>
      <br />
      <label>
        To:
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} />
      </label>
      <br />
      <label>
        Quantity:
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
          <option value="1">1 ton</option>
          <option value="2">2 tons</option>
          <option value="3">3 tons</option>
        </select>
      </label>
      <br />
      <label>
        Pickup:
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />
      </label>
      <br />
      <label>
        Transporter:
        <select
          value={transporter}
          onChange={(e) => setTransporter(e.target.value)}
        >
          <option value="transporter1">Transporter 1</option>
          <option value="transporter2">Transporter 2</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Manufacturer
