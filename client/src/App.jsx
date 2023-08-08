import React, { useState } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"

function App() {
  const [username, setUsername] = useState(
    window.localStorage.getItem("username") || ""
  )

  const [userType, setUserType] = useState(null)

  return (
    <div className="app">
      <Router>
        <Navbar username={username} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth setUsername={setUsername} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
