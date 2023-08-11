import { useEffect } from "react"
import socket from "../SocketHandler"
import axios from "axios"

const ChatBox = ({
  messageReceived,
  user,
  transporter,
  userType,
  orderID,
  username,
  transporterName,
  setMessageReceived,
}) => {
  const [sender, senderName, receiver, receiverName] =
    userType === "MANUFACTURER"
      ? [user, username, transporter, transporterName]
      : [transporter, transporterName, user, username]

  const sendMessage = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries())
    socket.emit("send_message", {
      room: `${user} ${transporter}`,
      content: data.message,
      sender,
      senderName,
      senderType: userType,
      receiver,
      receiverName,
      orderID,
    })
  }

  useEffect(() => {
    async function fetchMessage() {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}messages/${orderID}`
      )
      setMessageReceived(response.data)
    }
    fetchMessage()
  }, [orderID, setMessageReceived])

  return (
    <div className="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-md ">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          ChatBox Message:
        </div>
        <ul className="mt-2 text-gray-500 overflow-y-scroll max-h-[300px]">
          {messageReceived.map((data) => (
            <li key={data._id}>
              <span className="font-bold">{data.senderName}:</span>{" "}
              {data.content}
            </li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 mx-auto p-4 bg-white"
      >
        <input
          type="text"
          name="message"
          placeholder="send message..."
          className="border border-gray-300 rounded-md p-2 mr-2 w-[300px]"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reply
        </button>
      </form>
    </div>
  )
}

export default ChatBox
