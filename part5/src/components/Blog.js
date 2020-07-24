import React from 'react'
import Togglable from './Togglable';
const Blog = ({ blog }) => {

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

    <Togglable buttonLabel={"View"}>
      <div>
        {blog.url}<br/>
        {blog.likes}<br/>
      </div>
    </Togglable>
    </div>
  )
}

export default Blog