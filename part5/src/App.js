import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './index.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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

  const handleDelete = async (id) => {
    const deletedBlog = blogs.find(blog => blog.id === id)

    if(window.confirm('Delete the item?')) {
      try{
        await blogService.remove(deletedBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
      } catch (exception) {
        setErrorMessage('You can\'t delete this blog!')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
      setErrorMessage('Wrong password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addBlog = async ( blogObject ) => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)

      blogService.setToken(user.token)
      if (blog) {
        setMessage(`A new blog ${blog.title} by ${blog.author} added.`)
        setBlogs(blogs.concat(blog))
      }
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
      <Notification message={errorMessage} type={'error'} />
      <Notification message={message} type={'success'} />

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
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)} handleDelete={() => handleDelete(blog.id)} />
          )}
      </div>
    </div>
  )
}

export default App