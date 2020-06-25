const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('bloglist API', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Testando com supertest',
      author: 'FullstackOpen',
      url: 'fullstackopen.com',
      likes: 1000,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(title).toContain(
      'Testando com supertest'
    )
  })

  test('all blogs have id property', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})