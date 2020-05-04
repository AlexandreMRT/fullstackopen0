import React from 'react'

const Country = ({ country, setFilter }) => {
  return (
    <div> {country.name}
      <button onClick={() => setFilter(country.name)} >
        show
      </button>
    </div>
  )
}

export default Country
