import React from 'react'
import { useDispatch } from 'react-redux';

const CreateAnecdotes = () => {

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const addAnecdotes = (event) => {
    event.preventDefault()
    const content= event.target.anecdote.value
    event.target.anecdote.value = ''
    store.dispatch(createAnecdote(content))
  }

  const 


  const createAnecdote = (content) => {
    return {
      type: 'NEW_ANECDOTE',
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  }
  
  const voteForAnecdote = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  return (
    <div>
      <form onSubmit={addAnecdotes}>
        <input name="anecdote" /> 
        <button type="submit">add anecdote</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id} 
          >
            {note.content}
          </li>
        )}
      </ul>
    </div>
  )
}

export default CreateAnecdotes