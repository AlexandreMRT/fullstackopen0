import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './index.css'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/NotificationReducer'
import { initializeBlogs } from './reducers/BlogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs, createNewBlog } from './reducers/BlogsReducer'
import { setUser, getUser, userLogOut } from './reducers/UserReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const tempBlogs = useSelector(getBlogs)

  const user = useSelector(getUser)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      dispatch(setUser(userJson))
      blogService.setToken(userJson.token)
    }
  }, [])

  const handleDelete = async (id) => {
    const deletedBlog = blogs.find(blog => blog.id === id)

    if(window.confirm('Delete the item?')) {
      try{
        await blogService.remove(deletedBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
      } catch (exception) {
        dispatch(setNotification('You can\'t delete this blog!', 'error', 5))
      }
    }
  }

  const handleLike = async ( id ) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = { ...blog,
      likes: blog.likes + 1 }

    const response = await blogService.update(id, likedBlog)

    if (response) setBlogs((blogs.map(blog => blog.id !== id ? blog : likedBlog).sort((a, b) => b.likes - a.likes)))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userObject = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(userObject)
      )

      blogService.setToken(userObject.token)
      dispatch(setUser(userObject))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong password or username', 'error', 5))
    }
  }

  const addBlog = async ( blogObject ) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = dispatch(createNewBlog(blogObject))

      blogService.setToken(user.token)

      if (blog) {
        dispatch(setNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added.`, 'success', 5))
      }
    } catch (exception) {
      dispatch(setNotification('Wrong Credentials!'), 'error', 5)
    }
  }

  const handleLogOut = async (event)  => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(userLogOut())
  }

  const blogForm = () => (
    <Togglable buttonLabel="New Blog" ref={blogFormRef} >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} Logged in.<button onClick={handleLogOut}>Log Out</button></p>
          {blogForm()}
        </div>
      }
      <h2>Blog List</h2>
      <div className="blogs-container" >
        {
          tempBlogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)} handleDelete={() => handleDelete(blog.id)} />
          )}
      </div>
    </div>
  )
}

export default App