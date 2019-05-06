import Layout from '../components/Layout'
import Link from 'next/link'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import fetch from 'isomorphic-unfetch'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
})
const GET_BOOKS = gql`
  query {
    books(offset: 0, take: 99999) {
      total
      books {
        name
        id
        author {
          name
          id
        }
      }
    }
  }
`

const Books = props => (
  <ul>
    {props.books.map((book) => (
      <li key={book.id}>
        <Link as={`/book/${book.id}`} href={`/book?id=${book.id}`}>
          <a>{book.name}</a>
        </Link>
        <span> by </span>
        <Link as={`/author/${book.author.id}`} href={`/author?id=${book.author.id}`}>
          <a>{book.author.name}</a>
        </Link>
      </li>
    ))}
  </ul>
)

const Home = props => props.data ? (
  <Layout>
    <h1>Books</h1>
    <Books books={props.data.books.books} total={props.data.books.total} />
  </Layout>
) : (
  <Layout>
    <h1>Books</h1>
    <Query client={client} query={GET_BOOKS}>
      {({ loading, error, data }) => {
        if (error) return (<p>{error}</p>)
        if (loading || !data) return (<p>Loading</p>)
        return (<Books books={data.books.books} total={data.books.total} />)
      }}
    </Query>
  </Layout>
)

Home.getInitialProps = async function () {
  if (typeof window === 'undefined') {
    return client.query({ query: GET_BOOKS })
  }
  return {}
}

export default Home
