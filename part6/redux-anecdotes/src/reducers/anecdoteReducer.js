import getAll from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const voteForAnecdote = (id, content) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: {
      id,
      content
    }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}


const AnecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE_ANECDOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    default:
      return state
  }
}

export default AnecdoteReducer