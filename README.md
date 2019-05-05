
### Overview

Stripped down example of a GraphQL gateway using GraphQL components (partials).

Resolvers are backed by moleculer microservices.

Data is using [@convenience/store](https://github.com/holmok/convenience-store).

### Run

```bash
docker-compose up --build
```

### Demo

Hit http://localhost:4000/ for the GraphQL playground and enter a query. For example:

```graphql
query {
  book(id: "fight_club") {
    id
    name
    author {
      id
      name
    }
  }
}
```

It should result in something like:

```json
{
  "data": {
    "book": {
      "id": "fight_club",
      "name": "Fight Club",
      "author": {
        "id": "chuck_palahniuk",
        "name": "Chuck Palahniuk"
      }
    }
  }
}
```

Queries include:

```
# Search for an author by id.
author(id: ID!) : Author,
# List authors.
authors(offset: Int, take: Int) : Authors
# Search for an book by id.
book(id: ID!) : Book,
# List books.
books(offset: Int, take: Int) : Books
```

Mutations include:

```
# Create a new author (leaving out id will auto create one)..
createAuthor(id: ID, name: String!) : Author
# Update existing author
updateAuthor(id: ID!, name: String!) : Author
# Create a new author (leaving out id will auto create one).
createBook(id: ID, name: String!, author_id: ID!) : Book
# Update existing author
updateBook(id: ID!, name: String!, author_id: ID!) : Book
```