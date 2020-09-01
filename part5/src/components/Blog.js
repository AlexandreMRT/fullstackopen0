import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '5px',
    color: 'white',
    fontSize: '15px'
  }

  return (
    <div className='blog'>
      {visible ?
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
          <br />
          {blog.url}
          <br />
            Likes: {blog.likes} <button id="like-button" onClick={() => handleLike(blog)}>Like</button>
          <br />
          {blog.user.username}
          <br />
          <button style={removeButtonStyle} onClick={() => handleDelete(blog)}>Remove</button>
        </div> :
        <div style={blogStyle}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>Show</button>
        </div>
      }
    </div>
  )
}

export default Blog