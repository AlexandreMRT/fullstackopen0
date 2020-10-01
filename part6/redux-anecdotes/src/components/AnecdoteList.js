import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setVoteNotification, clearNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
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