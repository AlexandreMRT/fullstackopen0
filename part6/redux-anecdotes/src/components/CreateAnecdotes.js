import React from 'react'

const CreateAnecdotes = () => {

  const generateId = () => Number((Math.random() * 1000000).toFixed(0))

  const addAnecdotes = (event) => {
    event.preventDefault()
    const content= event.target.anectdote.value
    event.target.anectdote.value = ''
    store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId()
      }
    })
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