import React, { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import "../App.css"
import { useGetUserID } from "../hooks/useGetUserID"
import { HamburgerMenu } from "./HamburgerMenu"

function getActiveClass(route, location) {
  switch (location.pathname) {
    case route:
      return "activeTab"
      break

    default:
      return "tab"
      break
  }
}

export const Navbar = ({ setTheme, theme }) => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  const location = useLocation()
  const [showLinks, setShowLinks] = useState(false)
  const userID = useGetUserID()
  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }
  const handleTheme = () => {
    setTheme((previousTheme) => {
      return previousTheme === "light" ? "dark" : "light"
    })
  }
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <NavLink
                data-text="Home"
                className={getActiveClass("/", location)}
                to="/"
                className="flex items-center py-4 px-2"
              >
                <span className="font-semibold text-gray-500 text-lg">
                  ThreeWay
                </span>
              </NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <NavLink
                data-text="Home"
                className={getActiveClass("/", location)}
                to="/"
              >
                Home
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3 ">
            {!cookies.access_token ? (
              <NavLink className={getActiveClass("/auth", location)} to="/auth">
                Login/register
              </NavLink>
            ) : (
              <button className="logout" onClick={logout}>
                Logout
              </button>
            )}
            <button onClick={handleTheme} className="themeBtn">
              {theme === "dark" ? "🌞" : "🌛"}
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <HamburgerMenu onClick={() => setShowLinks(!showLinks)} />
          </div>
        </div>
      </div>
      <div
        className={`mobile-menu ${
          showLinks ? "" : "hidden"
        } md:hidden bg-white shadow-lg`}
      >
        <NavLink data-text="Home" to="/">
          Home
        </NavLink>

        {!cookies.access_token ? (
          <NavLink to="/auth">Login/register</NavLink>
        ) : (
          <>
            <button onClick={logout}>Logout</button>
            <button onClick={handleTheme} className="themeBtn">
              {theme === "dark" ? "🌞" : "🌛"}
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
