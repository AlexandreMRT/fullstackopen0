import React, { useEffect } from 'react'
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    anecdoteService
      .getAll().then(notes => dispatch(initializeAnecdotes(notes)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Notification />
      <AnecdotesList />
      <AnecdoteForm />
    </>
  )
}

export default App