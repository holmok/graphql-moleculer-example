const { Store } = require('@convenience/store')

const books = [
  {
    id: 'the_hobbit',
    name: 'The Hobbit',
    author_id: 'j_r_r_tolkien'
  },
  {
    id: 'fight_club',
    name: 'Fight Club',
    author_id: 'chuck_palahniuk'
  }
]

const store = new Store()
if (!store.existsBucket('books')) {
  store.createBucket('books', books[0])
}

for (const book of books) {
  if (!store.exists('books', book.id)) {
    store.create('books', book)
  }
}
