
const { ServiceBroker } = require('moleculer')
const { Store } = require('@convenience/store')

const broker = new ServiceBroker({
  nodeID: 'node-author',
  transporter: 'nats://nats-server:4222',
  logLevel: 'info',
  cacher: 'memory'
})

const store = new Store('/data')

broker.createService({
  name: 'author',
  actions: {
    get ({ params }) {
      return store.get('authors', params.id)
    },
    list ({ params }) {
      console.log('author list (service)', params)
      const list = store.getItems('authors', { take: params.take, offset: params.offset })
      return { total: list.count, authors: list.items }
    },
    update ({ params }) {
      store.update('authors', params.id, params)
      return Object.assign(params, { id: params.id })
    },
    create ({ params }) {
      const id = store.create('authors', params)
      return Object.assign(params, { id })
    }
  }
})
console.log('author service up')
broker.start()
