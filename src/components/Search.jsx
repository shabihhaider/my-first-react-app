import React from 'react'

const search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src="search.png" alt="Search" />

            <input 
                type="text" 
                placeholder='Search Through Thousand of Movies' 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} // This is the function that will update the searchTerm state
            />

        </div>
    </div>
  )
}

export default search