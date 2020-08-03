import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'test title' }
  })
  fireEvent.change(author, {
    target: { value: 'alexandre' }
  })
  fireEvent.change(url, {
    target: { value: 'alexandre.com.br' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  const mockedBlog = createBlog.mock.calls[0][0]
  expect(mockedBlog.title).toBe('test title')
  expect(mockedBlog.author).toBe('alexandre')
  expect(mockedBlog.url).toBe('alexandre.com.br')
})