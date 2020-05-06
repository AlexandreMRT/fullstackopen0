import React from 'react'
import personService from '../Services/personService';

const Person = ({ person, persons, setPersons }) => {


  const deletePerson = (id) => {
      personService
      .remove(id)

      setPersons(persons.filter(person => person.id !== id))
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