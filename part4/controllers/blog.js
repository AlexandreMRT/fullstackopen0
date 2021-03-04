const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {

  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title ||  !body.url) {
    return response.status(400).json({
      error: 'title and/or url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missong or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(request.params.id)

  if (user.id === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response
      .status(204)
      .end()
  } else {
    response
      .status(403)
      .end()
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {

  const body = request.body

  if (!body.comment) {
    return response.status(400).json({
      error: 'comment missing'
    })
  }

  const blog = await Blog.findById(request.params.id)

  const blogWithNewComment = {
    comments: [...blog.comments, body.comment]
  }

  Blog.findByIdAndUpdate(request.params.id, blogWithNewComment, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter