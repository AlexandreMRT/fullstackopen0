import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setVoteNotification, clearNotification } from '../reducers/notificationReducer'
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

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteForAnecdote(anecdote.id, anecdote.content))
            dispatch(setVoteNotification(anecdote.content))
            setTimeout(() => {
              dispatch(clearNotification())
            }, 5000)
          }}
        />
      )}
    </div>
  )
}

export default Anecdotes