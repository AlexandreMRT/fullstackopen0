describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Alexandre Teixeira',
      username: 'Alexandre',
      password: 'Translation1'
    }

    const userTwo = {
      name: 'Matheus Ramalho',
      username: 'Matheus',
      password: 'Translation1'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', userTwo)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Login')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()

    cy.contains('Username')
    cy.contains('Password')
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

  describe('when user logged in', function() {
    beforeEach(function() {
      // cy.visit('http://localhost:3000')
      // cy.contains('Login').click()
      // cy.get('#username').type('Alexandre')
      // cy.get('#password').type('Translation1')
      // cy.get('#login-button').click()
      // different way to login without having to fill the form
      //cy.login uses the support/commands.js function
      cy.login({ username: 'Alexandre', password: 'Translation1' })
    })

    it('a new Blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Blog title')
      cy.get('#author').type('Blog author')
      cy.get('#url').type('blogurl.com.br')
      cy.get('#create-button').click()
      cy.contains('A new blog Blog title by Blog author added.')
    })

    describe('And a blog exists', function() {
      beforeEach(function() {
        // cy.contains('New Blog').click()
        // cy.get('#title').type('First Blog')
        // cy.get('#author').type('Alexandre Teixeira')
        // cy.get('#url').type('www.alexandre.com.br')
        // cy.get('#create-button').click()
        // cy.contains('A new blog First Blog by Alexandre Teixeira added.')
        cy.createBlog({
          title: 'First Blog',
          author: 'Alexandre Teixeira',
          url: 'www.alexandre.com.br'
        })
        cy.createBlog({
          title: 'Second Blog',
          author: 'Alexandre Teixeira',
          url: 'www.alexandre.com.br',
          likes: 20
        })
        cy.createBlog({
          title: 'Third Blog',
          author: 'Alexandre Teixeira',
          url: 'www.alexandre.com.br',
          likes: 30
        })
      })

      it('it can be liked', function () {
        cy.contains('Third Blog Alexandre Teixeira')
          .contains('Show')
          .click()

        cy.contains('www.alexandre.com.br')
          .contains('Likes: ')
          .contains('Alexandre')
          .contains('Like')
          .click()
      })

      it('other of those can be liked', function () {
        cy.contains('Second Blog Alexandre Teixeira').parent().find('button').click()
        cy.contains('Second Blog Alexandre Teixeira').parent().find('#like-button')
          .should('contain', 'Like')
          .click()
        cy.contains('Likes: 1')
      })

      it('the creator of the blog can delete it', function () {

        cy.contains('Second Blog Alexandre Teixeira')
          .contains('Show')
          .click()

        cy.contains('Remove')
          .click()

        cy.on('window:confirm', () => true)
        cy.get('.blogs-container').should('not.contain', 'Second Blog Alexandre Teixeira')
      })

      it('a user cannot delete a blog he did not create', function () {
        cy.contains('Log Out')
          .click()

        cy.login({ username: 'Matheus', password: 'Translation1' })

        cy.contains('Second Blog Alexandre Teixeira')
          .contains('Show')
          .click()

        cy.contains('Remove')
          .click()

        cy.on('window:confirm', () => true)
        cy.contains('You can\'t delete this blog!')
      })

    })
  })
})