import React from 'react'
import personService from '../Services/personService';

const Person = ({ person, persons, setPersons, setErrorMessage }) => {

  const deletePerson = (id) => {
      personService
      .remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setErrorMessage(`Removed '${person.name}'`)
      setTimeout(() => {
        setErrorMessage(null)                
      }, 3000)
  }

  return (
    <div>{person.name} {person.number}
      <button  onClick={() => { if  (window.confirm(`Delete ${person.name} ?`))  deletePerson(person.id)} }>
        Delete
      </button>
    </div>
  )
}

export default Person