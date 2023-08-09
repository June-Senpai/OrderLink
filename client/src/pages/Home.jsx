import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import OrderItem from "../components/OrderItem"
import Search from "../components/Search"
import axios from "axios"

const Home = () => {
  const [orderList, setOrderList] = useState([])
  const [searchTerm, setSearchTerm] = useState({
    orderID: "",
    from: "",
    to: "",
    // quantity: "",
    // pickupAddress: "",
    // transporter: "",
  })
  const [cookies] = useCookies(["access_token"])
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/auth")
    }
  }, [cookies, navigate])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}orders`
      )
      setOrderList(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchOrders()
    const intervalId = setInterval(fetchOrders, 5000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="w-full max-w-md">
        {orderList
          .filter((item) =>
            Object.keys(searchTerm).every(
              (field) =>
                searchTerm[field] === "" ||
                (item[field] &&
                  item[field]
                    .toString()
                    .toLowerCase()
                    .includes(searchTerm[field].toLowerCase()))
            )
          )
          .map((order) => (
            <OrderItem order={order} key={order._id} />
          ))}
      </div>
    </div>
  )
}

export default Home
