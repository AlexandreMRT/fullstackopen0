import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{ text }</button>
  )
}

const DisplayAnecdotes = ({anecdotes, selected, points}) => {
  return (
    <div>
      {anecdotes[selected]}
      <p>has {points[selected]} votes </p>
    </div>
  )
}

const DisplayMostVotedAnecdotes = ({ anecdotes, points, highest }) => {
  let indexOfHighest = points.indexOf(highest)

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdotes anecdotes={anecdotes} selected={indexOfHighest} points={points} />
    </div>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(7).join('0').split('').map(parseFloat))

    const randomAnecdote = () => {
    let random = (Math.random() * 5).toFixed(0);
    return (
      setSelected(random)
      )
    }
    
    const addVote = () => {
      const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
    }

    const highestVotes = Math.max(...points);

  return (
    <div>
      <DisplayAnecdotes anecdotes={anecdotes} selected={selected} points={points} />
      <Button text='vote' handleClick={addVote} />
      <Button text='next anecdote' handleClick={randomAnecdote}/>
      <DisplayMostVotedAnecdotes anecdotes={anecdotes} points ={points} highest={highestVotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)