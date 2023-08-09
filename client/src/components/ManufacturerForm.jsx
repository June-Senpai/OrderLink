import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"

const ManufacturerForm = () => {
  const orderID = useMemo(() => Date.now().toString(36).toUpperCase(), [])

  const pickupAddress = localStorage.getItem("address")
  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const formData = Object.fromEntries(data.entries())
    formData.user = localStorage.getItem("userID")
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}orders`, formData)
      // alert("Order created successfully")
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  const [transporters, setTransporters] = useState([])

  useEffect(() => {
    const fetchTransporters = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}transporters`
        )
        setTransporters(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchTransporters()
  }, [])

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
              name="orderID"
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
              name="from"
              type="text"
              id="from"
              placeholder="Source of the pickup"
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
              name="to"
              type="text"
              id="to"
              placeholder="Destination of where the goods are meant to be delivered"
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
              name="quantity"
              id="quantity"
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
              name="pickupAddress"
              type="text"
              id="pickupAddress"
              defaultValue={pickupAddress}
              placeholder="Address"
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
            <select
              name="transporter"
              id="transporter"
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              {transporters.map((transporter) => (
                <option key={transporter._id} value={transporter._id}>
                  {transporter.username}
                </option>
              ))}
            </select>
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
