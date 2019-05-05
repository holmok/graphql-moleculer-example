
const { ServiceBroker } = require('moleculer')
const { Store } = require('@convenience/store')

const broker = new ServiceBroker({
  nodeID: 'node-book',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
})

const store = new Store()

broker.createService({
  name: 'book',
  actions: {
    get ({ params }) {
      return store.get('books', params.id)
    },
    list ({ params }) {
      const list = store.getItems('books', { take: params.take, offset: params.offset })
      return { total: list.count, books: list.items }
    },
    update ({ params }) {
      store.update('books', params.id, params)
      return Object.assign(params, { id: params.id })
    },
    create ({ params }) {
      const id = store.create('books', params)
      return Object.assign(params, { id })
    }
  }
})

broker.start()
