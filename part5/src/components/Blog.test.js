import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('render content', () => {
  const blog = {
    title: 'Titulo do blog test',
    author: 'Alexandre',
    url: 'www.alexandre.com.br',
    likes: 0,
    user: {
      _id: '5efd328c67b2ad967fcb5551',
      username: 'alexandre',
      name: 'Alexandre',
      password: 'google5',
    },
  }

  const component = render(
    <Blog blog={blog} />
  )

  // The first way uses method toHaveTextContent to search for a matching text from the entire HTML code rendered by the component.
  // toHaveTextContent is one of many "matcher"-methods that are provided by the jest-dom library.

  expect(component.container).toHaveTextContent(
    'Titulo do blog test Alexandre'
  )

  // The second way uses the getByText method of the object returned by the render method. The method returns the element that contains the given text. An exception occurs if no such element exists. For this reason, we would technically not need to specify any additional expectation.

  const element = component.getByText(
    'Titulo do blog test Alexandre'
  )

  expect(element).toBeDefined()

  // The third way is to search for a specific element that is rendered by the component with the querySelector method that receives a CSS selector as its parameter.

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Titulo do blog test Alexandre'
  )
})

test('the component only display the blog title and author', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'testurl',
    likes: 0,
    user: {
      name: 'Alexandre',
    }
  }


  const component = render(
    <Blog blog={blog}  />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'testtitle testauthor Show'
  )
})

test('clicking the show button opens the component ', () => {
  const blog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'testurl',
    likes: 0,
    user: {
      name: 'Alexandre',
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggleVisibility={mockHandler} />
  )

  const button = component.getByText('Show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('testtitle')
  expect(component.container).toHaveTextContent('testauthor')
  expect(component.container).toHaveTextContent('testurl')
  expect(component.container).toHaveTextContent('Likes')
})