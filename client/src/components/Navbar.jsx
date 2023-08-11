import { useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useCookies } from "react-cookie"
import { HamburgerMenu } from "./HamburgerMenu"

export const Navbar = ({ username }) => {
  const [cookies, setCookies] = useCookies(["access_token"])
  const navigate = useNavigate()
  const location = useLocation()
  const [showLinks, setShowLinks] = useState(false)
  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }

  const userType = window.localStorage.getItem("userType")

  return (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-6xl mx-auto px-4 p-2">
        <div className="flex justify-between ">
          <div className="flex space-x-7">
            <div>
              {cookies.access_token && (
                <NavLink
                  data-text="Home"
                  className={` flex items-center`}
                  to="/"
                >
                  <span className="font-semibold text-gray-500 text-2xl">
                    ThreeWay
                  </span>
                </NavLink>
              )}
            </div>

            {userType === "MANUFACTURER" && location.pathname === "/" ? (
              <div className="hidden md:flex items-center space-x-1">
                <NavLink
                  data-text="Form"
                  className="hidden md:flex items-center space-x-3 text-2xl"
                  to="/form"
                >
                  Form
                </NavLink>
              </div>
            ) : null}
          </div>
          <div className="hidden md:flex items-center space-x-3 text-2xl ">
            {!cookies.access_token ? (
              <NavLink className={("/auth", location)} to="/auth">
                Login/register
              </NavLink>
            ) : (
              <>
                <span>{username}</span>
                <button className="logout text-red-400" onClick={logout}>
                  Logout
                </button>
              </>
            )}
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
        style={{ zIndex: 10 }}
      >
        <NavLink
          data-text="Home"
          to="/"
          className="text-gray-700 font-semibold py-2 px-4 transition duration-300 ease-in-out hover:text-blue-00 flex flex-col items-center justify-center"
        >
          Home
        </NavLink>
        {userType === "MANUFACTURER" && location.pathname === "/" ? (
          <NavLink
            data-text="Form"
            className="text-gray-700 font-semibold py-2 px-4 transition duration-300 ease-in-out hover:text-blue-00 flex flex-col items-center justify-center"
            to="/form"
          >
            Form
          </NavLink>
        ) : null}
        <div className="flex flex-col">
          {!cookies.access_token ? (
            <NavLink
              to="/auth"
              className="text-gray-700 font-semibold py-2 px-4 transition duration-300 ease-in-out hover:text-blue-900 flex flex-col items-center justify-center "
            >
              Login/register
            </NavLink>
          ) : (
            <>
              <button
                onClick={logout}
                className="text-red-400 font-semibold py-2 px-4 transition duration-300 ease-in-out hover:text-blue-900 "
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
