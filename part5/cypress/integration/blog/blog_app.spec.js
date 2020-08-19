describe('Blog app', function() {
  beforeEach(function() {
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
    cy.get('#username').type('testUser')
    cy.get('#password').type('qweasdzxc')
    cy.get('#login-button').click()

    cy.contains('Ines morante Logged in.')
  })
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('#username').type('testUser')
    cy.get('#password').type('qweasdzxc')
    cy.get('#login-button').click()
  })

  it('a new Blog can be created', function() {
    cy.contains('New Blog').click()
    cy.get('input').type('a blog created by cypress')
    // cy.contains('save').click()
    // cy.contains('a note created by cypress')
  })
})
