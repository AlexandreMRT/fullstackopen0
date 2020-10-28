import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      {anecdote.content}
      <br />
      has {anecdote.votes}
      <button onClick={handleClick} >vote</button>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    } else {
      return (state.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(state.filter.toUpperCase())))
    }
  })

  const voteFor = async (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteFor(anecdote)}
        />
      )}
    </div>
  )
}

export default Anecdotes