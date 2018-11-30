import React from 'react'
import './SignIn.scss'
import { Auth } from 'aws-amplify'

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    error: ''
  })

  changeState(state, data) {
    const { onStateChange } = this.props
    if (onStateChange) {
      onStateChange(state, data)
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    this.inputs[name] = value
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.inputs;
    Auth.signIn(username, password)
        .then(() => this.handleSuccess(username))
        .catch(err => this.handleError(err))
  }

  handleSuccess = (username) => {
    this.getInitialState()
    this.changeState('confirmSignIn', username)
  }

  handleError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  render() {

    const { authState } = this.props;
    if (!['signIn', 'signedOut', 'signedUp'].includes(authState)) { return null; }

    const { error } = this.state;
    
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="username" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} autoFocus required />
            <div className="invalid-feedback">
                Please choose an username.
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="********" onChange={this.handleChange} autoFocus required />
            <div className="invalid-feedback">
                Please choose a password.
            </div>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => this.changeState('signUp')}>
            Sign Up
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => this.changeState('forgotPassword')}>
            Forgot Password
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          { error && <div className="alert alert-danger fixed-bottom" role="alert">{error}</div> }
        </form>
      </div>
    );
  }
}

export default SignIn
