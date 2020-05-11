import React, { useState, useEffect }  from 'react';

const axios = require('axios');
const api_key = process.env.REACT_APP_API_KEY

const CapitalWeather = ({ capital }) => {
  const [apiResponse, setApiReponse] = useState({})

  const params = {
    access_key: api_key,
    query: capital
  }

  useEffect(() => {
    axios.get('http://api.weatherstack.com/current', {params})
    .then(response => response.data.current)
    .then(response => setApiReponse(response))
  })

  console.log('apiResponse :>> ', apiResponse);

  return (
    <div>
      <h2>Wather in {capital}</h2>
      <p>temperature: {apiResponse.temperature} Celsius</p>
      <img alt={capital.name} src={apiResponse.weather_icons}></img>
      <p>wind: {apiResponse.wind_speed} mph direction {apiResponse.wind_dir} </p>
    </div>
  )
}

export default CapitalWeather;