import React from 'react'
import Languages from './Languages';
import Flag from './Flag';

const CountryShow = ({ country }) => {
  return (
    <div>
      <h2>{country.name} </h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <Flag country={country} />
    </div>
  )
}

export default CountryShow
