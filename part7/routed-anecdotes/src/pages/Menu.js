import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom"

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <Router>
      <Link style={padding} to="/">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </Router>
  )
}

export default Menu;