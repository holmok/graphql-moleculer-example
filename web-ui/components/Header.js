import Link from 'next/link'
import './header.css'

export default function Header () {
  return (
    <div className='row'>
      <ul className='header-nav'>
        <li>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href='/about'>
            <a>About</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
