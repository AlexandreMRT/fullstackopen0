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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}