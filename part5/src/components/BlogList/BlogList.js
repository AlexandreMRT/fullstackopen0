import React from 'react'
import { useSelector } from 'react-redux'

import { getBlogs } from '../../reducers/BlogsReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(getBlogs)

  return (
    <>

      <h2>Blog List</h2>
      <table>
        <tbody>
          {
            blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default BlogList