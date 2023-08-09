import React, { useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"
import ManufacturerForm from "./components/ManufacturerForm"
import { TransporterForm } from "./components/TransporterForm"
import { v4 as uuidv4 } from "uuid"
import Order from "./components/Order"

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  )
  const [userType, setUserType] = useState(
    window.localStorage.getItem("userType") || ""
  )
  const [orderID, setOrderID] = useState(uuidv4())

  return (
    <div>
      <Router>
        <Navbar username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          {userType === "TRANSPORTER" ? (
            <Route
              path="/form"
              element={<TransporterForm orderID={orderID} />}
            />
          ) : (
            <Route
              path="/form"
              element={
                <ManufacturerForm orderID={orderID} setOrderID={setOrderID} />
              }
            />
          )}
          <Route
            path="/formT"
            element={<TransporterForm orderID={orderID} />}
          />
          <Route
            path="/auth"
            element={
              <Auth setUsername={setUsername} setUserType={setUserType} />
            }
          />
          <Route path="/order/:id" element={<Order orderID={orderID} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
