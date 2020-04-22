import React, { useState } from 'react'
import Person from './Components/Person';

const App = () => {
  const [ persons, setPersons ] = useState(
    [
      {
        name: 'Arto Hellas',
        id: 'Arto Hellas',
        phone: '040-1234567'

       }
    ]
  )
  const [ newName, setNewName ] = useState('')

  const [ newPhone, setNewPhone ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      id: newName,
      phone: newPhone
    }
    persons.some(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    setNewName('')
    setNewPhone('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange}
           />
        </div>
        <div>
          number: <input
          value={newPhone}
          onChange={handlePhoneChange}
           />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <Person key={person.id} person={person} />
        )}
      </div>
    </div>
  )
}

export default App