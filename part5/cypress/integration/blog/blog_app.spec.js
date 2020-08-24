describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alexandre Teixeira',
      username: 'Alexandre',
      password: 'Translation1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can login', function () {
    cy.contains('Login').click()
    cy.get('#username').type('Alexandre')
    cy.get('#password').type('Translation1')
    cy.get('#login-button').click()

    cy.contains('Alexandre Teixeira Logged in.')
  })

  it('login fails with wrong password', function() {
    cy.contains('Login').click()
    cy.get('#username').type('Alexandre')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').should('contain', 'Wrong password or username')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Alexandre logged in')
  })
})

describe('when user logged in', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('#username').type('Alexandre')
    cy.get('#password').type('Translation1')
    cy.get('#login-button').click()
  })

  it('a new Blog can be created', function() {
    cy.contains('New Blog').click()
    cy.get('#title').type('Blog title')
    cy.get('#author').type('Blog author')
    cy.get('#url').type('blogurl.com.br')
    cy.get('#create-button').click()
    cy.contains('A new blog Blog title by Blog author added.')
  })
})
