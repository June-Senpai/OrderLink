import { useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export const Auth = () => {
  return (
    <div className="auth flex flex-col items-center justify-center">
      <Login />
      <Register />
    </div>
  )
}

const Login = () => {
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

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("TRANSPORTER")
  const [address, setAddress] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}users/register/user`,
        {
          username,
          password,
          userType,
          address,
        }
      )
      alert("Registration successful. Please login.")
    } catch (err) {
      console.error(err)
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
