const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialUsers = [
  {
    _id: '5efd328c67b2ad967fcb5551',
    username: 'alexandre',
    name: 'Alexandre',
    password: 'google5',
    __v: 0
  },
  {
    _id: '5efe8e3e21dd7e89f825e31c',
    username: 'tedl',
    name: 'Alexandre Teixeira',
    password: '123456',
    __v: 0
  }
]

const initialBlogs = [
  {
    title: 'titulo',
    author: 'autor',
    url: 'url.com.br',
    likes: 100,
    id: '5ee96ff91eb96bc0e57ee909',
    user: initialUsers[0]._id,
  },
  {
    title: 'O Livro de Alexandre O Grande',
    author: 'Alexandre',
    url: 'alexandre.com.br',
    likes: 1000000,
    id: '5ee970971eb96bc0e57ee90a'
  },
  {
    title: 'O Livro da Refatoração',
    author: 'Alexandre',
    url: 'refactor.com',
    likes: 12,
    id: '5eead034c2b420e707d33167'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'O Livro da Refatoração',
    author: 'Alexandre',
    url: 'refactor.com',
    likes: 12,
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const tokenForGivenUser = () => {
  const userForToken = {
    username: initialUsers[0].username,
    id: initialUsers[0]._id,
  }

  return jwt.sign(userForToken, config.SECRET)
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb, tokenForGivenUser
}