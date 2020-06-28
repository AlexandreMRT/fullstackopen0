const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
})

describe('bloglist API', () => {
  describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('update the likes from a valid blog', async () => {

      const blogs = await helper.blogsInDb()
      const blogToUpdate = blogs[0]

      const newBlog = {
        likes: 157,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      const likes = blogsAtEnd.map(r => r.likes)

      expect(likes).toContain(newBlog.likes)

    })

    test('all blogs have id property', async () => {

      const response = await api.get('/api/blogs')

      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
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

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(title).toContain(
        'Testando com supertest'
      )
    })

    test('a blog without likes is set to default 0 likes', async () => {
      const newBlog = {
        title: 'Testing without likes',
        author: 'Alexandre Teixeira',
        url: 'fullstackopen.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const lastBlogLikes = response.body.map(r => r.likes)

      expect(lastBlogLikes.pop()).toBe(0)
    })

    test('a blog without title recieves a bad request', async () => {
      const newBlog = {
        author: 'Alexandre Teixeira',
        url: 'fullstackopen.com',
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'title and/or url missing' })
    })

    test('a blog without url recieves a bad request', async () => {
      const newBlog = {
        title: 'Tests without url',
        author: 'Alexandre Teixeira',
        likes: 13
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'title and/or url missing' })
    })

    test('a blog without title and url recieves a bad request', async () => {
      const newBlog = {
        author: 'Alexandre Teixeira',
        likes: 11
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect({ error: 'title and/or url missing' })
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)

    })
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})