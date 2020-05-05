import React from 'react'
import Languages from './Languages';
import CountryWeather from './CapitalWeather';

const CountryShow = ({ country }) => {
  return (
    <div>
      <h2>{country.name} </h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <Languages languages={country.languages} />
      <img src={country.flag} height="100" width="100" alt={country.name} />
      <CountryWeather capital={country.capital} />
    </div>
  )
}

export default CountryShow
