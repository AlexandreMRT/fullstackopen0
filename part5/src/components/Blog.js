import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: 'blue',
    borderRadius: '5px',
    color: 'white',
    fontSize: '15px'
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{ visible ? 'Hide' : 'Show' }</button>

      <div style={showWhenVisible}>
        {blog.url}<br />
        likes {blog.likes} <button onClick={() => blogService.update(blog.id, { likes: blog.likes + 1 })} >Like</button><br/>
        {blog.user.name}<br />
        <button style={removeButtonStyle} onClick={() => { if(window.confirm('Delete the item?')) {blogService.remove(blog.id)} }} >Remove</button><br/>
      </div>
    </div>
  )
}

export default Blog



//OUTRA FORMA DE ESCREVER ESSE COMPONENTE


// import React, { useState } from 'react'
// import blogService from '../services/blogs'

// const Blog = ({ blog }) => {
//   const [visible, setVisible] = useState(false)

//   const toggleVisibility = () => {
//     setVisible(!visible)
//   }

//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   const removeButtonStyle = {
//     backgroundColor: 'blue',
//     borderRadius: '5px',
//     color: 'white',
//     fontSize: '15px'
//   }

//   return (
//     <div className='blog'>
//       {visible ?
//         <div style={blogStyle}>
//           {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
//           <br />
//           {blog.url}
//           <br />
//             likes: {blog.likes} <button onClick={() => blogService.update(blog.id, { likes: blog.likes + 1 })}>like</button>
//           <br />
//           {blog.user.username}
//           <br />
//           <button style={removeButtonStyle} onClick={() => { if(window.confirm('Delete the item?')) {blogService.remove(blog.id)} }}>delete</button>
//         </div> :
//         <div style={blogStyle}>
//           {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
//         </div>
//       }
//     </div>
//   )
// }

// export default Blog