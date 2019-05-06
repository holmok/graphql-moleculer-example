import Header from './Header'
import './normalize.css'
import './skeleton.css'

const Layout = props => (
  <div className='container'>
    <Header />
    {props.children}
  </div>
)

export default Layout
