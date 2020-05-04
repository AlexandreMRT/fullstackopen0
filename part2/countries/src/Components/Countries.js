import React from 'react'
import Country from './Country';

const Countries = ({ countries }) => {

  console.log('countries :>> ', countries);
  return (
    <div>
      {countries.map(country =>
      <Country country={country} />
      )}
    </div>
  )
}

export default Countries;