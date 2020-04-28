import React, { useState, useEffect } from 'react'
import Persons from './Components/Persons';
import Filter from './Components/Filter';
import axios from 'axios';

const Form = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input
          value={newName}
          onChange={handleNameChange}
           />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const peopleToShow = (persons.some(person => person.name.toUpperCase() === filter.toUpperCase()) ? persons.filter(person => person.name.toUpperCase() === filter.toUpperCase()) : persons)

  useEffect(() => {
    console.log('effect :>> ')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fullfiled :>> ');
        setPersons(response.data)
      })
  }, [])
  console.log('render :>> ',persons.length, 'persons');

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    persons.some(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const HandleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} HandleFilterChange={HandleFilterChange} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} />

    </div>
  )
}

export default App