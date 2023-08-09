import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"
import ManufacturerForm from "./components/ManufacturerForm"
import Order from "./components/Order"
import { io } from "socket.io-client"

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  )
  const [userType, setUserType] = useState(
    window.localStorage.getItem("userType") || ""
  )

  const socket = io(import.meta.env.VITE_BACKEND_URL)

  return (
    <div>
      <Router>
        <Navbar username={username} userType={userType} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/form" element={<ManufacturerForm />} />

          <Route
            path="/auth"
            element={
              <Auth setUsername={setUsername} setUserType={setUserType} />
            }
          />
          <Route path="/order/:id" element={<Order />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
