const { Store } = require('@convenience/store')
const Path = require('path')

const authors = [
  {
    id: 'j_r_r_tolkien',
    name: 'J.R.R Tolkien'
  },
  {
    id: 'chuck_palahniuk',
    name: 'Chuck Palahniuk'
  }
]

const store = new Store(Path.join(__dirname, 'data'))
if (!store.existsBucket('authors')) {
  store.createBucket('authors', authors[0])
}

for (const author of authors) {
  store.create('authors', author)
}

const results = store.getItems('authors')
console.log(results.count)
for (const result of results.items) {
  console.log('item', result)
}
