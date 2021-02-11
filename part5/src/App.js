import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList/BlogList'
import User from './components/User'

const App = () => {
  return(
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>

      <Switch>
        <Route exact path="/">
          <BlogList />
        </Route>

        <Route path="/users">
          <User />
        </Route>
      </Switch>
    </Router>
  )
}

export default App