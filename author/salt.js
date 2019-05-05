const { Store } = require('@convenience/store')

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

const store = new Store('/data')

if (!store.existsBucket('authors')) {
  store.createBucket('authors', authors[0])
}

for (const author of authors) {
  if (!store.exists('authors', author.id)) {
    store.create('authors', author)
  }
}
