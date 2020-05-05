import React from 'react'
import Country from './Country';
import CountryShow from './CountryShow';

const Countries = ({ countries, setFilter }) => {

  if (countries.length >= 10) {
    return (
      <div>
      Too many matches, specify another filter
    </div>
  )} else if (countries.length === 1) {
      return (
       <div>
        <CountryShow country={countries[0]} />
       </div>
    )} else if (countries.length <= 10){
      return (
        <div>
          {countries.map((country, index) =>
          <Country key={index} country={country} setFilter={setFilter} />
          )}
        </div>
      )
    }
}

export default Countries;