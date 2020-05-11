import React, { useState, useEffect } from 'react'
import './index.css'
import Persons from './Components/Persons';
import Filter from './Components/Filter';
import Notification from './Components/Notification';
import personService from './Services/personService';

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
  const peopleToShow = (persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase())))
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    const foundPerson = (persons.find(person => person.name === newName))

    if (foundPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the older number with a new one ?`)) {

        personService
          .update(foundPerson.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== foundPerson.id ? person : response.data))
            setMessage(`Updated '${newName}' `)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(
              `The note '${foundPerson.name}' was already deleted from server`
            )
            setPersons(persons.filter(n => n.id !== foundPerson.id))
          })
        }
    } else {
      personService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Added '${newName}' `)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
      }
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
      <Notification message={errorMessage} type={"error"} />
      <Notification message={message} type={"succes"} />
      <Filter filter={filter} HandleFilterChange={HandleFilterChange} />
      <h2>Add a new</h2>
      <Form addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App