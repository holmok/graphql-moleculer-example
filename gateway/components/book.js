/* eslint-disable camelcase */

const Author = require('./author')
const GraphQLComponent = require('graphql-component')

class BookComponent extends GraphQLComponent {
  constructor ({ broker }) {
    const authorComponent = new Author({ broker })

    const types = `
      # This is a book.
      type Book {
        id: ID!
        # The name of the book.
        name: String,
        # The book's author.
        author: Author
      }
      type Books {
        total: Int,
        books: [Book]
      }
      type Query {
        # Search for an book by id.
        book(id: ID!) : Book,
        # List books.
        books(offset: Int, take: Int) : Books
      }
      type Mutation {
        # Create a new author.
        createBook(id: ID, name: String!, author_id: ID!) : Book
        # Update existing author
        updateBook(id: ID!, name: String!, author_id: ID!) : Book
      }
    `

    const resolvers = {
      Query: {
        book (_, { id }, { call }) {
          return this._broker.call('book.get', { id })
        },
        books (_, { offset, take }, { call }) {
          return this._broker.call('book.list', { offset, take })
        }
      },
      Mutation: {
        createBook (_, { id, name, author_id }, { call }) {
          return this._broker.call('book.create', { id, name, author_id })
        },
        updateBook (_, { id, name, author_id }, { call }) {
          return this._broker.call('book.update', { id, name, author_id })
        }
      },
      Book: {
        async author (book, args, context, info) {
          const { data, errors } = await this._authorComponent.execute(`query { author(id: "${book.author_id}") { ...AllAuthor }}`, context)

          if (errors) {
            throw errors[0]
          }

          return data.author
        }
      }
    }

    super({ types, resolvers, imports: [authorComponent] })

    this._broker = broker
    this._authorComponent = authorComponent
  }
}

module.exports = BookComponent
