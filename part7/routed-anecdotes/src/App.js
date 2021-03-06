import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
import AnecdoteList from './pages/AnecdoteList';
import About from './pages/About';
import Footer from './pages/Footer';
import CreateNew from './pages/CreateNew';
import Anecdote from './pages/Anecdote';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      
      <div>
        <Link style={{paddingRight: 5}} to="/">anecdotes</Link>
        <Link style={{paddingRight: 5}} to="/create">create new</Link>
        <Link style={{paddingRight: 5}} to="/about">about</Link>
      </div>
      <div>{notification}</div>

      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>

        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </Router>
  )
}

export default App;
