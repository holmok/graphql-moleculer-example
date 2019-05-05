
const GraphQLComponent = require('graphql-component')

class AuthorComponent extends GraphQLComponent {
  constructor ({ broker }) {
    const types = `
      # An author.
      type Author {
        id: ID!
        # The author name.
        name: String,
      }
      type Authors {
        total: Int,
        authors: [Author]
      }
      type Query {
        # Search for an author by id.
        author(id: ID!) : Author,
        # List authors.
        authors(offset: Int, take: Int) : Authors
      }
      type Mutation {
        # Create a new author.
        createAuthor(id: ID, name: String!) : Author
        # Update existing author
        updateAuthor(id: ID!, name: String!) : Author
      }
    `

    const resolvers = {
      Query: {
        author (_, { id }, { call }) {
          return this._broker.call('author.get', { id })
        },
        authors (_, { offset, take }, { call }) {
          console.log('author list (component)', { offset, take })
          return this._broker.call('author.list', { offset, take })
        }
      },
      Mutation: {
        createAuthor (_, { id, name }, { call }) {
          return this._broker.call('author.create', { id, name })
        },
        updateAuthor (_, { id, name }, { call }) {
          return this._broker.call('author.update', { id, name })
        }
      }
    }

    super({ types, resolvers })

    this._broker = broker
  }
}

module.exports = AuthorComponent
