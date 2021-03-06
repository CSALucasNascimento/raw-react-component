import React from 'react'
import './Login.scss'
import { Auth } from 'aws-amplify'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.inputs = {};
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    error: ''
  })

  handleChange = (e) => {
    const { name, value } = e.target
    this.inputs[name] = value
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.inputs;
    Auth.signIn(email, password)
        .then(user => this.loginSuccess())
        .catch(err => this.loginError(err))
  }

  loginSuccess = () => {
    this.getInitialState();
  }

  loginError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  render() {

    const { error } = this.state;
    
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleChange} autoFocus required />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <div className="invalid-feedback">
                Please choose an email.
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          { error && <div className="alert alert-danger fixed-bottom" role="alert">{error}</div> }
        </form>
      </div>
    );
  }
}

export default Login
