import React from 'react'

const Flag = ({ country }) => {
  return (
    <img src={country.flag} height="100" width="100" />
  )
}

export default Flag