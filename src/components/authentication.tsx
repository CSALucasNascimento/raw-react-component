import * as React from 'react'
import './authentication.scss'
import * as logo from './logo.png'

class Authentication extends React.Component {

  render() {
    return (
      <div className='authentication'>
        <img src={logo} className='logo'/>
      </div>
    )
  }

}

export default Authentication