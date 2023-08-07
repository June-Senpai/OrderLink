import React from "react"

const OrderItem = ({ order }) => {
  const { id, from, to, quantity, pickup, transporter } = order
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Order ID: {id}</h2>
      <p className="mb-1">
        <span className="font-semibold">From:</span> {from}
      </p>
      <p className="mb-1">
        <span className="font-semibold">To:</span> {to}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Quantity:</span> {quantity}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Pickup:</span> {pickup}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Transporter:</span> {transporter}
      </p>
    </div>
  )
}

export default OrderItem
