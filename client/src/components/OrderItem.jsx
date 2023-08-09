import React from "react"
import { useNavigate } from "react-router-dom"

const OrderItem = ({ order }) => {
  const { orderID, from, to, quantity, pickupAddress, transporter } = order
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/order/${orderID}`)
  }

  return (
    <div
      className="border border-gray-300 rounded-md p-4 mb-4 cursor-pointer hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Order ID:</div>
        {orderID}
      </div>
      <p className="mt-2 text-gray-500">
        <span className="font-semibold">From:</span> {from}
      </p>
      <p className="mt-2 text-gray-500">
        <span className="font-semibold">To:</span> {to}
      </p>
    </div>
  )
}

export default OrderItem
