const { v4: uuid } = require('uuid');
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const allBooks = Book.find({}).populate('author', { name: 1 });
        return allBooks;
      }
      if (args.author) {
        //WIP
        const bookCount = await Book.find({ author: { $in: root.id } });
        return 1;
      } else if (args.genre) {
        const booksByGenre = await Book.find({
          genres: { $in: [args.genre] },
        }).populate('author', { name: 1 });
        return booksByGenre;
      }
    },
    allAuthors: () => Author.find({}),
  },
  Book: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: (root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Author: {
    name: (root) => root.name,
    bookCount: (root) => root.bookCount,
  },
  Author: {
    bookCount: (root) => {
      console.log('root.name :>> ', root);
      const books = Book.collection.countDocuments();

      console.log('books :>> ', books);
      return 3;
      // return books.filter((b) => {
      //   return b.author === root.name;
      // }).length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const name = args.author;
        author = new Author({ name, id: uuid() });
        author.save();
        // authors = authors.concat(author);
      }
      const book = new Book({ ...args, author: author, id: uuid() });
      // books = books.concat(book);
      return book.save();
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);

      if (!author) {
        return null;
      }
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
