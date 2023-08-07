import React from "react"
import { useState } from "react"
import OrderItem from "../components/OrderItem"
import Search from "../components/Search"

const order = [
  {
    id: 1,
    from: "kanpur",
    to: "paris",
    quantity: 2,
    pickup: "t-35 vikas nagar,lucknow",
    transporter: "shiva",
  },
  {
    id: 2,
    from: "kanpur",
    to: "lucknow",
    quantity: 2,
    pickup: "t-35 vikas nagar,lucknow",
    transporter: "shiva",
  },
  {
    id: 3,
    from: "kanpur",
    to: "lucknow",
    quantity: 2,
    pickup: "t-35 vikas nagar,lucknow",
    transporter: "shiva",
  },
  {
    id: 4,
    from: "kanpur",
    to: "lucknow",
    quantity: 2,
    pickup: "t-35 vikas nagar,lucknow",
    transporter: "shiva",
  },
  {
    id: 5,
    from: "kanpur",
    to: "lucknow",
    quantity: 2,
    pickup: "t-35 vikas nagar,lucknow",
    transporter: "shiva",
  },
]

const Home = () => {
  const [orderList, setOrderList] = useState(order)

  return (
    <div className="flex flex-col items-center justify-center">
      <Search order={order} setOrderList={setOrderList} />
      <div className="w-full max-w-md">
        {orderList.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </div>
  )
}
export default Home
