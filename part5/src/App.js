import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList/BlogList'
import Users from './components/Users'
import { initializeUsers, getUsers } from './reducers/UsersReducer'
import User from './components/User/User'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector(getUsers)

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

        <Route exact path="/users">
          <Users />
        </Route>

        <Route path="/users/:id">
          <User users={users} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App