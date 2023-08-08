import React from "react"

const Search = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (event, field) => {
    setSearchTerm((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }))
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 items-center justify-center mt-2 mb-2">
      {Object.keys(searchTerm).map((field) => (
        <input
          key={field}
          type="text"
          placeholder={`Search by ${field}...`}
          onChange={(event) => handleSearch(event, field)}
          value={searchTerm[field]}
          className="border border-gray-300 rounded-md px-4 py-2 mb-2"
        />
      ))}
    </div>
  )
}

export default Search
