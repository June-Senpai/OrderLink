import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

function Order() {
  const [order, setOrder] = useState(null)
  const { id: orderID } = useParams()
  const userType = window.localStorage.getItem("userType")
  const isTransporter = userType === "TRANSPORTER"
  const [isEditingPriceMode, setIsEditingPriceMode] = useState(false)
  const [price, setPrice] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    const oldOrder = order
    try {
      setOrder({ ...order, price })
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}orders/${orderID}/price`,
        {
          price,
        }
      )
      setIsEditingPriceMode(false)
    } catch (err) {
      setOrder(oldOrder)
      console.error(err)
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}orders/${orderID}`
        )
        setOrder(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrder()
  }, [orderID])

  const onClickButton = isEditingPriceMode
    ? onSubmit
    : () => setIsEditingPriceMode(!isEditingPriceMode)

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
          <p className="mt-2 text-gray-500">
            Transporter: {order.transporterName}
          </p>
          <div className="flex">
            {order.price && !isEditingPriceMode ? (
              <p className="mt-2 text-gray-500">Price: {order.price}</p>
            ) : null}

            {isEditingPriceMode ? (
              <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
              />
            ) : null}
            {isTransporter ? (
              <button onClick={onClickButton} className="p-2 ">
                {isEditingPriceMode ? "Save" : "Edit Price"}
              </button>
            ) : null}
          </div>
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
