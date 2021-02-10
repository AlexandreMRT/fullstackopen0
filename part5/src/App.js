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
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const App = () => {
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
  }, [dispatch])

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
      dispatch(createNewBlog(blogObject))

      blogService.setToken(user.token)

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

  // return (
  //   <div>
  //     <h2>Blogs</h2>
  //     <Notification />

  //     {user === null ?
  //       loginForm() :
  //       <div>
  //         <p>{user.name} Logged in.<button onClick={handleLogOut}>Log Out</button></p>
  //         {blogForm()}
  //       </div>
  //     }
  //     <h2>Blog List</h2>
  //     <div className="blogs-container" >
  //       {
  //         tempBlogs.sort((a, b) => b.likes - a.likes).map(blog =>
  //           <Blog key={blog.id} blog={blog} />
  //         )}
  //     </div>
  //   </div>
  // )
  return(
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </div>

      <Switch>
        <Route path="/">
          <Bloglist />
        </Route>

        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </Router>
  )
}

export default App