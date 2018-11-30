import React from 'react'
import './SignOut.scss'
import { Auth } from 'aws-amplify'

class SignOut extends React.Component {

  handleSignOut = () => {
    Auth.signOut()
        .then(() => this.signOutSuccess())
        .catch(err => this.signOutError(err))
  }

  signOutSuccess = () => {
    this.getInitialState();
  }

  signOutError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  render() {

    const { error } = this.state;
    
    return (
      <div className="signup">
          <button type="submit" className="btn btn-primary" onClick={this.handleSignOut}>
            Submit
          </button>
          { error && <div className="alert alert-danger fixed-bottom" role="alert">{error}</div> }
      </div>
    );
  }
}

export default SignOut
