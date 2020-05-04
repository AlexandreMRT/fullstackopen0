import React from 'react'

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map(language => {
        return <li key={language.name}>{language.name}</li>
      })}
    </ul>
  )
}

export default Languages