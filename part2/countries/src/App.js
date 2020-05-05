import React, { useState, useEffect } from 'react';
import Countries from './Components/Countries';
import Filter from './Components/Filter';
import axios from 'axios';

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const countriesToShow = (countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase())))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} setFilter={setFilter} />
    </div>
  );
}

export default App;