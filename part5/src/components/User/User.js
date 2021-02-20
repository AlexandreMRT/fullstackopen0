import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUsers } from '../../reducers/UsersReducer'

const User = () => {
  const users = useSelector(getUsers)

  const id = useParams().id
  const user = users.find(n => n.id === id)

  return (
    <div>
      <h1>{user?.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user?.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User