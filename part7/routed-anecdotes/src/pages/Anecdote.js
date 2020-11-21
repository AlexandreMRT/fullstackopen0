import React from 'react';
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(n => Number(n.id) === Number(id))
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} {anecdote.votes === 1 ? "vote" : "votes"}</div>
    </div>
  )
}

export default Anecdote;