import * as React from 'react'
import './Authentication.scss'
import * as logo from './logo.png'

class Authentication extends React.Component {

  render() {
    console.log('test')
    return (
      <div className='authentication'>
      Auth
        <img src={logo} className='logo'/>
      </div>
    )
  }

}

export default Authentication