import React from "react"

const OrderItem = ({ order }) => {
  const { orderID, from, to, quantity, pickupAddress, transporter } = order
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <span className="text-lg font-semibold ">Order ID:</span>
      {orderID}
      <p className="mb-1">
        <span className="font-semibold">From:</span> {from}
      </p>
      <p className="mb-1">
        <span className="font-semibold">To:</span> {to}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Quantity:</span> {quantity} ton
      </p>
      <p className="mb-1">
        <span className="font-semibold">Pickup:</span> {pickupAddress}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Transporter:</span> {transporter}
      </p>
    </div>
  )
}

export default OrderItem
