import React from 'react'
import Country from './Country';
import CountryShow from './CountryShow';

const Countries = ({ countries }) => {

  if (countries.length >= 10) {
    return (<div>Too many matches, specify another filter</div>)
    } else if (countries.length === 1) {
       return (
        <div>
          {countries.map(country =>
          <CountryShow country={country} />
          )}
        </div>
       )} else {
      return (
        <div>
          {countries.map(country =>
          <Country country={country} />
          )}
        </div>
      )
    }
}

export default Countries;