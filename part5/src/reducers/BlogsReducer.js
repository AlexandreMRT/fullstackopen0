import blogService from '../services/blogs'

export const addBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

const BlogsReducer = (state = null, action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return action.data
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}



export default BlogsReducer
