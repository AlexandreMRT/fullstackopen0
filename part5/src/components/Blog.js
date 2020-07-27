import React, { useState } from 'react'
import blogService from '../services/blogs';

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

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
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{ visible ? 'Hide' : 'Show' }</button>

      <div style={showWhenVisible}>
        {blog.url}<br />
        {blog.likes} <button onClick={() => blogService.update(blog.id, { likes: blog.likes + 1 })} >Like</button><br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog