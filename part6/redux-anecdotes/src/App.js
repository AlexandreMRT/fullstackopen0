import React, { useEffect } from 'react'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[dispatch])

  return (
    <>
      <Notification />
      <AnecdotesList />
      <AnecdoteForm />
    </>
  )
}

export default App