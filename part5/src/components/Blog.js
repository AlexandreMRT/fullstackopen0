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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{ buttonText }</button>
    <div style={hideWhenVisible}>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br />
        {blog.likes}<br />
        {blog.user.name}
    </div>
</div>
  )
}

export default Blog