import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function Order() {
  const [order, setOrder] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}orders/${id}`
        )
        setOrder(response.data)
        console.log(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrder()
  }, [id])

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {order ? (
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Order ID: {order.orderID}
          </div>
          <p className="mt-2 text-gray-500">From: {order.from}</p>
          <p className="mt-2 text-gray-500">To: {order.to}</p>
          <p className="mt-2 text-gray-500">Quantity: {order.quantity}</p>
          <p className="mt-2 text-gray-500">
            Pickup Address: {order.pickupAddress}
          </p>
          <p className="mt-2 text-gray-500">Transporter: {order.transporter}</p>
        </div>
      ) : (
        <div className="h-12 w-32 flex justify-center items-center text-2xl">
          Loading...
        </div>
      )}
    </div>
  )
}

export default Order
