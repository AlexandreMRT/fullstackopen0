import React from 'react'
import { useParams } from 'react-router-dom'

const User = ({ users }) => {

  const id = useParams().id
  const user = users.find(n => n.id === id)

  return (
    <div>
      <h1>{user?.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {
          user?.blogs.map(blog => {
            console.log(blog.title)
          })
        }
      </ul>
    </div>
  )
}

export default User