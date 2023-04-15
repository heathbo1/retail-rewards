import logo from './logo.svg'
import './Loader.scss'

const Loader = () => {

  return(
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <span className='loading'>Loading...</span>
    </div>
  )
}

export default Loader;