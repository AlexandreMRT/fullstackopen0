const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'titulo',
    author: 'autor',
    url: 'url.com.br',
    likes: 100,
    id: '5ee96ff91eb96bc0e57ee909'
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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}