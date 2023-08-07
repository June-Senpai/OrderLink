import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import Home from "./pages/Home"
import { Auth } from "./pages/Auth"
function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
