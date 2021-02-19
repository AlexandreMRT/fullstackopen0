import blogService from '../services/blogs'
import { setNotification } from './NotificationReducer'

export const commentBlog = (comment, blogId) => {

  return async dispatch => {
    const updatedBlog = await blogService.addComment( { comment }, blogId )
    dispatch({
      type: ADD_COMMENT,
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog.id)
      dispatch({
        type: DELETE_BLOG,
        data: blog
      })
    }
    catch(error) {
      dispatch(setNotification('You can\'t delete this blog!', 'error', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: LIKE_BLOG,
      data: updatedBlog,
    })
  }
}

export const createNewBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    if (newBlog) {
      dispatch(setNotification(`A new blog '${newBlog.title}' by ${newBlog.author} added.`, 'success', 5))
    }
    dispatch({
      type: NEW_BLOG,
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: INIT_BLOGS,
      data: blogs,
    })
  }
}

//action types
export const NEW_BLOG = 'NEW_BLOG'
export const INIT_BLOGS = 'INIT_BLOGS'
export const DELETE_BLOG = 'DELETE_BLOG'
export const LIKE_BLOG = 'LIKE_BLOG'
export const ADD_COMMENT = 'ADD_COMMENT'

//selectors
export const getBlogs = (state) => state.blogs

const BlogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE_BLOG': {
    const id = action.data.id
    const deletedBlog = state.find(blog => blog.id === id)
    return state.filter(blog => blog.id !== deletedBlog.id)
  }
  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  case 'ADD_COMMENT': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      comments: action.data.comments
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  default:
    return state
  }
}

export default BlogsReducer