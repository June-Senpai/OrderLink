import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"
import ManufacturerForm from "./components/ManufacturerForm"
import Order from "./components/Order"
import socket from "./SocketHandler"

function App() {
  const [messageReceived, setMessageReceived] = useState([])
  const [order, setOrder] = useState({})
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  )
  const [userType, setUserType] = useState(
    () => window.localStorage.getItem("userType") || ""
  )

  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const handleOrderCreated = (newOrder) => {
      setOrderList((prevState) => [...prevState, newOrder])
    }
    socket.on("orderCreated", handleOrderCreated)

    const handlePriceUpdate = (orderWithUpdatedPrice) => {
      if (userType === "MANUFACTURER") {
        setOrder((prevOrder) => ({
          ...prevOrder,
          price: orderWithUpdatedPrice.price,
        }))
      }
    }

    socket.on("priceUpdated", handlePriceUpdate)

    const handleReceive = (message) => {
      setMessageReceived((prevState) => [...prevState, message])
    }
    socket.on("receive_message", handleReceive)

    return () => {
      socket.off("receive_message", handleReceive)
      socket.off("priceUpdated", handlePriceUpdate)
      socket.off("orderCreated", handleOrderCreated)
    }
  }, [userType, setOrderList, setMessageReceived, setOrder])

  return (
    <div>
      <Router>
        <Navbar username={username} userType={userType} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                socket={socket}
                orderList={orderList}
                setOrderList={setOrderList}
              />
            }
          />

          <Route path="/form" element={<ManufacturerForm socket={socket} />} />

          <Route
            path="/auth"
            element={
              <Auth setUsername={setUsername} setUserType={setUserType} />
            }
          />
          <Route
            path="/order/:id"
            element={
              <Order
                socket={socket}
                order={order}
                setOrder={setOrder}
                messageReceived={messageReceived}
                setMessageReceived={setMessageReceived}
                username={username}
                orderList={orderList}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
