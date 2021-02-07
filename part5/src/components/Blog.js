import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/BlogsReducer'
import { setNotification } from '../reducers/NotificationReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async ( blog ) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (id) => {
    // const deletedBlog = blogs.find(blog => blog.id === id)

    if(window.confirm('Delete the item?')) {
      try{
        dispatch(deleteBlog(blog.id))
      } catch (exception) {
        dispatch(setNotification('You can\'t delete this blog!', 'error', 5))
      }
    }
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
          {blog.title} {blog.author} <button id="show-button" onClick={toggleVisibility}>Show</button>
        </div>
      }
    </div>
  )
}

export default Blog