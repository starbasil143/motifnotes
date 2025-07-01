"use client"

import { useState } from "react";

export default function SearchBar() {

  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    
  }

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input 
        placeholder='The searcherrr'
        onChange={(e) => {setQuery(e.target.value)}}
        onSubmit={handleSearch}
      />
    </div>
  )
}