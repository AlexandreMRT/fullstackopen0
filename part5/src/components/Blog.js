import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/BlogsReducer'
import { useParams, useHistory } from 'react-router-dom'


const Blog = ({ blogs }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async ( blog ) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Delete the item?')) {
      dispatch(deleteBlog(blog))
      history.push('/')
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
    <>
      <h2>blog app</h2>

      <div>

      </div>

      <h1>{blog?.title}</h1>
      <a href={blog?.url}>{blog?.url}</a>
      <p>{blog?.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
      <p>added by {blog?.author}</p>
      <button style={removeButtonStyle} onClick={() => handleDelete(blog)}>Remove</button>

      <h3>comments</h3>
      <ul>
        {blog?.comments?.map((comment, index) => {
          return <li key={index}>{comment.title}</li>
        })}
      </ul>
      {/* {visible ?
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
      } */}
    </>
  )
}

export default Blog