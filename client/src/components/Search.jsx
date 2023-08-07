import React, { useState } from "react"

const Search = ({ order, setOrderList }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredData = order.filter(
    (item) => item.transporter.toLowerCase().includes(searchTerm.toLowerCase())
    // item.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // item.to.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchSubmit = () => {
    setOrderList(filteredData)
  }

  return (
    <div className="flex items-center justify-center mt-2 mb-2">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
        value={searchTerm}
        className="border border-gray-300 rounded-md px-4 py-2 "
      />
      <button
        onClick={handleSearchSubmit}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Search
      </button>
    </div>
  )
}

export default Search
