import React from 'react'
import Person from './Person';

const Persons = ({ persons, setPersons, setErrorMessage }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} persons={persons} setPersons={ setPersons } setErrorMessage={setErrorMessage} />
      )}
    </div>
  )
}

export default Persons;