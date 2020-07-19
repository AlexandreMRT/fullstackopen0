import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setblogFormVisible] = useState(false)


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

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title,
        author,
        url
      })

      blogService.setToken(user.token)
      setTitle('')
      setAuthor('')
      setUrl('')
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
      <h2>{user.name} logged in.<button onClick={handleLogOut}>Log Out</button></h2>
      {blogForm()}
    </div>
  )

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            passowrd={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setblogFormVisible(true)}>Create Blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
            handleSubmit={handleSubmit}
            handleBlogTitleChange={({ target }) => setTitle(target.value)}
            handleBlogAuthorChange={({ target }) => setAuthor(target.value)}
            handleBlogUrlChange={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
          <button onClick={() => setblogFormVisible(false)}>Cancel</button>
        </div>
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