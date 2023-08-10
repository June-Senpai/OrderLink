import React, { useState, useEffect, useCallback } from "react"
import socket from "../SocketHandler"

const ChatBox = ({
  setMessageReceived,
  messageReceived,
  user,
  transporter,
  userType,
  orderID,
  username,
  transporterName,
}) => {
  const [sender, senderName, receiver, receiverName] =
    userType === "MANUFACTURER"
      ? [user, username, transporter, transporterName]
      : [transporter, transporterName, user, username]

  const sendMessage = useCallback(
    (e) => {
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
    },
    [socket]
  )

  return (
    <div className="mt-10 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          ChatBox Message:
        </div>
        <ul className="mt-2 text-gray-500 overflow-y-scroll max-h-[300px]">
          {messageReceived.map((data) => (
            <li key={data.id}>
              <span className="font-bold">{data.senderName}:</span> {data.msg}
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
