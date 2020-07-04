const bcrypt = require('bcrypt')

const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('senha', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('user API', () => {
  describe('when there is initially one user in db', () => {
    test('creation succeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'tedl',
        name: 'Alexandre Teixeira',
        password: 'google'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })
  })

  describe('addition of a new user', () => {
    test('response with appropriate status code when username already exists in database', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'SuperUsuario',
        password: 'monstro'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('response with appropriate status code when username its not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        name: 'Alexandre teixeira',
        password: 'google'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('username and/or password missing')

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('response with appropriate status code when password its not given', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'Tedl',
        name: 'Alexandre teixeira',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      expect(result.body.error).toContain('username and/or password missing')

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })
})