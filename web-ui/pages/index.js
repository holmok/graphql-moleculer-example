import withLayout from '../components/Layout'
import Link from 'next/link'

const PostLink = props => (
  <li>
    <Link as={`/p/${props.id}`} href={`/details?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

const Home = () => (
  <ul>
    <PostLink id='hello-nextjs' title='Hello Next.js' />
    <PostLink id='learn-nextjs' title='Learn Next.js is awesome' />
    <PostLink id='deploy-nextjs' title='Deploy apps with Zeit' />
  </ul>
)

export default withLayout(Home)
