import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import './index.css'
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`Wrond password or username`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog = async ( blogObject ) => {

    try {
      const blog = await blogService.create(blogObject)

      blogService.setToken(user.token)
      if (blog) setMessage(`A new blog ${blog.title} by ${blog.author} added.`)
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogOut = async (event)  => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const loggedUser = (user) => (
    <div>
      <h2>{user.name} Logged in.<button onClick={handleLogOut}>Log Out</button></h2>
      <Togglable buttonLabel="New Blog">
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )

  const loginForm = () => {

    return (
      <div>
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            passowrd={password}
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
      <Notification message={errorMessage} type={"error"} />
      <Notification message={message} type={"succes"} />

      {user === null ?
      loginForm() :
      loggedUser(user)
      }
      <h2>Blogs</h2>
      {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App