import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Home = props => (
  <Layout>
    <ul>
      {props.shows.map(show => {
        return (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/details?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  </Layout>
)

Home.getInitialProps = async function () {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry.show)
  }
}

export default Home
