import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('rendering the blog tests', () => {

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {

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

    component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
  })

  test('render content', () => {

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

    expect(component.container).toHaveTextContent(
      'Titulo do blog test Alexandre Show'
    )
  })

  test('clicking the show button opens the component ', () => {

    const button = component.getByText('Show')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Titulo do blog test')
    expect(component.container).toHaveTextContent('Alexandre')
    expect(component.container).toHaveTextContent('www.alexandre.com.br')
    expect(component.container).toHaveTextContent('Likes')
  })

  test('clicking the like button twice adds a like to the blog ', () => {

    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    const likeButton = component.getByText('Like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
