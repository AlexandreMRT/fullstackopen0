import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/NotificationReducer'
import { commentBlog } from '../reducers/BlogsReducer'
import { useField } from '../hooks/useField'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const comment = useField('text')
  const useFieldWithoutReset = (({ reset, ...rest }) => rest)

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(comment.value, blogId))
      comment.reset()
    } catch (exception) {
      dispatch(setNotification('Something went wrong!'), 'error', 5)
    }
  }

  return (
    <div className="formDiv">
      <h2>Create Blog</h2>
      <form onSubmit={handleCommentSubmit}>
        <div>
          Comment
          <input {...useFieldWithoutReset(comment)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CommentForm