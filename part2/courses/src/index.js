import React from 'react'
import ReactDOM from 'react-dom'



const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1> { name } </h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <p key={part.id} >{part.name} {part.exercises}</p>
      )}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <strong>total of {parts.reduce((sum, part) => {
      return part.exercises + sum
    }, 0)} exercises</strong>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))