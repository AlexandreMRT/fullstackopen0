import React from 'react';

const BlogForm = ({
  handleSubmit,
  handleBlogTitleChange,
  handleBlogAuthorChange,
  handleBlogUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div>
      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>
      <div>
        Title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        Author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        URL
        <input
          type="text"
          value={url}
          name="Url"
          onChange={handleBlogUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
    </div>
    
  )
}

export default BlogForm