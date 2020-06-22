const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return sum
}

// const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  let highestNumberOfLikes = 0
  let indexOfHighest = {}
  blogs.map(blog => {
    if (blog.likes > highestNumberOfLikes) {
      highestNumberOfLikes = blog.likes
      indexOfHighest = blog
    }
  })
  return indexOfHighest
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const authors = blogs.map(blog => blog.author)

  let mostBlogsAuthor = authors.reduce(function (acc, curr) {
    if (typeof acc[curr] === 'undefined') {
      acc[curr] = 1
    } else {
      acc[curr] += 1
    }
    return acc
  }, {})

  let result = Object.assign(                       // collect all objects into a single obj
    ...Object                                       // spread the final array as parameters
      .entries(mostBlogsAuthor)                     // key a list of key/ value pairs
      .sort(({ 1: a }, { 1: b }) => b - a)          // sort DESC by index 1
      .slice(0, 1)                                  // get first element of array
      .map(([k, v]) => ({ [k]: v }))                // map an object with a destructured
  )

  return {
    author: Object.keys(result)[0],
    blogs: Object.values(result)[0],
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}


  const authorsWithLikes = blogs.map(({ author, likes }) => ({ author, likes }))

  const authorsWithJointLikes = []

  authorsWithLikes.forEach(function (a) {
    if (!this[a.author]) {
      this[a.author] = { author: a.author, likes: 0 }
      authorsWithJointLikes.push(this[a.author])
    }
    this[a.author].likes += a.likes
  }, Object.create(null))

  const result = authorsWithJointLikes.reduce((prev, current) => (+prev.likes > +current.likes) ? prev : current)

  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}