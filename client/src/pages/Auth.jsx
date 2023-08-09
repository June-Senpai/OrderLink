import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth = ({ setUsername, setUserType }) => {
  return (
    <div className="auth flex flex-col items-center justify-center">
      <Login setUsername={setUsername} setUserType={setUserType} />
      <Register />
    </div>
  )
}

const Login = ({
  setUsername: setUsernameProp,
  setUserType: setUserTypeProp,
}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/login`,
        {
          username,
          password,
        }
      )

      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      window.localStorage.setItem("username", username)
      window.localStorage.setItem("userType", response.data.userType)
      window.localStorage.setItem("address", response.data.address)
      setUsernameProp(username)
      setUserTypeProp(response.data.userType)
      navigate("/")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="form1 w-full max-w-md mb-4">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
      />
    </div>
  )
}

const Modal = ({ isOpen, onClose, children, error }) => {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
          <div className="p-4">
            {error ? <p className="text-red-500">{error}</p> : children}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("TRANSPORTER")
  const [address, setAddress] = useState("")

  const [registrationStatus, setRegistrationStatus] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/register/user`,
        {
          username,
          password,
          userType,
          address,
        }
      )
      if (response.data.message === "user already exists") {
        setErrorMessage("A user with that username already exists.")
      } else {
        setRegistrationStatus("success")
      }
    } catch (err) {
      console.error(err)
      setRegistrationStatus("error")
    }
  }

  return (
    <div className="w-full max-w-md">
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
      >
        <Modal
          isOpen={registrationStatus === "success"}
          onClose={() => setRegistrationStatus("")}
        >
          <p>Registration successful. Please login.</p>
        </Modal>
        <div className="form-group mb-4">
          <label htmlFor="userType" className="block mb-1 font-semibold">
            User Type:
          </label>
          <select
            name="userType"
            value={userType}
            onChange={(event) => setUserType(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          >
            <option value="TRANSPORTER">Transporter</option>
            <option value="MANUFACTURER">Manufacturer</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="address" className="block mb-1 font-semibold">
            Address:
          </label>
          <input
            name="address"
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
          />
        </div>
        <Modal
          isOpen={!!errorMessage}
          onClose={() => setErrorMessage("")}
          error={errorMessage}
        />
      </Form>
    </div>
  )
}

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
  children,
}) => {
  return (
    <div className="auth-container border border-gray-300 rounded-md p-4">
      <form onSubmit={onSubmit}>
        <h2 id="logo" className="text-lg font-semibold mb-4">
          {label}
        </h2>
        <div className="form-group mb-4">
          <label htmlFor="username" className="block mb-1 font-semibold">
            Username:
          </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            autoComplete="username"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password" className="block mb-1 font-semibold">
            Password:
          </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            autoComplete="current-password"
          />
        </div>
        {children}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {label}
        </button>
      </form>
    </div>
  )
}
