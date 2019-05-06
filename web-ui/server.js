const express = require('express')
const next = require('next')

const { ApolloServer } = require('apollo-server-express')
const { ServiceBroker } = require('moleculer')
const GraphQLComponent = require('graphql-component')
const AuthorComponent = require('./services/author')
const BookComponent = require('./services/book')

const broker = new ServiceBroker({
  nodeID: 'web-ui',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
})

const { schema, context } = new GraphQLComponent({ imports: [new AuthorComponent({ broker }), new BookComponent({ broker })] })

const apollo = new ApolloServer({
  schema,
  context
})

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

broker.start()
  .then(() => {
    return app.prepare()
  })
  .then(() => {
    const server = express()
    apollo.applyMiddleware({ app: server })
    server.get('/p/:id', (req, res) => {
      const actualPage = '/details'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
      console.log(`🚀 GraphQL Server ready at http://localhost:3000${apollo.graphqlPath}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
