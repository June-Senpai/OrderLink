import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"
import ManufacturerForm from "./components/ManufacturerForm"
import { TransporterForm } from "./components/TransporterForm"

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  )
  const [userType, setUserType] = useState(
    window.localStorage.getItem("userType") || ""
  )

  return (
    <div className="app">
      <Router>
        <Navbar username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          {userType === "TRANSPORTER" ? (
            <Route path="/form" element={<TransporterForm />} />
          ) : (
            <Route path="/form" element={<ManufacturerForm />} />
          )}
          <Route path="/formT" element={<TransporterForm />} />
          <Route
            path="/auth"
            element={
              <Auth setUsername={setUsername} setUserType={setUserType} />
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
