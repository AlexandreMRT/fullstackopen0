import blogs from '../services/blogs'
import blogService from '../services/blogs'

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog,
    })
  }
}

export const createNewBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

//selectors
export const getBlogs = (state) => state.blogs

const BlogsReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
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
  default:
    return state
  }
}

export default BlogsReducer