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

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {
            users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          }

        </tbody>
      </table>
    </>

  )
}

export default Users