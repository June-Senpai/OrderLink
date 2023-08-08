import { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const TransporterForm = ({ orderID }) => {
  const [price, setPrice] = useState("")

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}orders/${orderID}`,
        {
          price,
        }
      )
      // alert("Price sent successfully")
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
          <h1 className="text-2xl font-bold mb-4">Transporter Form</h1>
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
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Reply
          </button>
        </motion.form>
      </div>
    </div>
  )
}
