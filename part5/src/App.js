import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList/BlogList'
import Users from './components/Users'

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
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}

export default App