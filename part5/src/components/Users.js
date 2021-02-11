import React, { useEffect } from 'react'
import { getUsers, initializeUsers } from '../reducers/UsersReducer'
import { useSelector, useDispatch } from 'react-redux'
import User from './User/User'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector(getUsers)

  const userStyle = {
    paddingLeft: 150,
    marginBottom: 5,
    fontWeight: 'bold'
  }

  return (
    <div>
      <h2>Users</h2>
      <p style={userStyle}>blogs created</p>
      <div>
        {
          users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <User key={user.id} user={user} />
          )
        }
      </div>
    </div>
  )
}

export default Users