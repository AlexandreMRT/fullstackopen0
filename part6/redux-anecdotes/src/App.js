import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux';
import { addAnecdote, voteForAnecdote } from './reducers/anecdoteReducer'

import reducer from './reducers/anecdoteReducer';


const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log('anecdotes :>> ', anecdotes);
  const dispatch = useDispatch()

  const voteAnecdote = ( id ) => {
    dispatch(voteForAnecdote(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App