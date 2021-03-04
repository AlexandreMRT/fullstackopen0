import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, getBlogs } from '../reducers/BlogsReducer'
import { useParams, useHistory } from 'react-router-dom'
import  CommentForm  from '../components/CommentForm'

const Blog = () => {
  const blogs = useSelector(getBlogs)
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const blog = blogs.find(n => n.id === id)

  const handleLike = async ( blog ) => {
    dispatch(likeBlog(blog))
  }

  const handleDelete = async (blog) => {
    if (window.confirm('Delete the item?')) {
      dispatch(deleteBlog(blog))
      history.push('/')
    }
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
      <h1>{blog?.title}</h1>
      <a href={blog?.url}>{blog?.url}</a>
      <p>{blog?.likes} likes <button onClick={() => handleLike(blog)}>like</button></p>
      <p>added by {blog?.author}</p>
      <button style={removeButtonStyle} onClick={() => handleDelete(blog)}>Remove</button>

      <h3>comments</h3>
      <CommentForm blogId={blog?.id} />
      <ul>
        {blog?.comments?.map((comment, index) => {
          return <li key={index}>{comment}</li>
        })}
      </ul>
    </>
  )
}

export default Blog