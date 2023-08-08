import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"

const ManufacturerForm = () => {
  const [orderID, setOrderID] = useState(uuidv4())
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [pickupAddress, setPickupAddress] = useState("")
  const [transporter, setTransporter] = useState("")

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}orders`, {
        orderID,
        from,
        to,
        quantity,
        pickupAddress,
        transporter,
      })
      // alert("Order created successfully")
      setOrderID(uuidv4())
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="border border-gray-300 w-[50%] p-4 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4">Manufacturer Form</h1>
          <div className="mb-4">
            <label
              htmlFor="orderID"
              className="block text-gray-700 font-medium mb-2"
            >
              Order ID:
            </label>
            <input
              type="text"
              id="orderID"
              value={orderID}
              readOnly
              className="border bg-slate-200 border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="from"
              className="block text-gray-700 font-medium mb-2"
            >
              From:
            </label>
            <input
              type="text"
              id="from"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="to"
              className="block text-gray-700 font-medium mb-2"
            >
              To:
            </label>
            <input
              type="text"
              id="to"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Quantity:
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value={1}>1 ton</option>
              <option value={2}>2 tons</option>
              <option value={3}>3 tons</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="pickupAddress"
              className="block text-gray-700 font-medium mb-2"
            >
              Pickup Address:
            </label>
            <input
              type="text"
              id="pickupAddress"
              value={pickupAddress}
              onChange={(event) => setPickupAddress(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="transporter"
              className="block text-gray-700 font-medium mb-2"
            >
              Transporter:
            </label>
            <input
              type="text"
              id="transporter"
              value={transporter}
              onChange={(event) => setTransporter(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Request
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default ManufacturerForm
