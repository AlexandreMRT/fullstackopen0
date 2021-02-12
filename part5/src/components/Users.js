import React, { useEffect } from 'react'
import { getUsers, initializeUsers } from '../reducers/UsersReducer'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector(getUsers)

  const userStyle = {
    paddingLeft: 170,
    marginBottom: 5,
    fontWeight: 'bold'
  }

  return (
    <div>
      <h2>Users</h2>
      <p style={userStyle}>blogs created</p>
      <ul>
        {
          users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link><div>{user.blogs.length}</div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Users