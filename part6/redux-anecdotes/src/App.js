import React from 'react'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  return (
    <>
      <Notification />
      <AnecdotesList />
      <AnecdoteForm />
    </>
  )
}

export default App