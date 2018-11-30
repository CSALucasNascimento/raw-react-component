import React from 'react'
import './SignUp.scss'
import { Auth } from 'aws-amplify'

class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.inputs = {}
    this.state = this.getInitialState()
  }

  getInitialState = () => ({
    error: ''
  })

  changeState(state, data) {
    const { onStateChange } = this.props;
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
    const { username, email, password, phone } = this.inputs;
    Auth.signUp(username, password, email, phone)
        .then(() => this.handleSuccess(username))
        .catch(err => this.handleError(err))
  }

  handleSuccess = (username) => {
    this.getInitialState();
    this.changeState('confirmSignUp', username);
  }

  handleError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  render() {

    const { authState } = this.props;
    if (authState !== 'signUp') { return null; }

    const { error } = this.state;
    
    return (
      <div className="signup">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} required />
            <div className="invalid-feedback">
                Please choose an username.
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={this.handleChange} required />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <div className="invalid-feedback">
                Please choose an email.
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="********" onChange={this.handleChange} required />
            <div className="invalid-feedback">
                Please choose a password.
            </div>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="phone" name="phone" className="form-control" placeholder="+61 9999 999 999" onChange={this.handleChange} required />
            <div className="invalid-feedback">
                Please choose a phone.
            </div>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="button" className="btn btn-secondary" onClick={() => this.changeState('signIn')}>
            Back to SignIn
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => this.changeState('confirmSignUp')}>
            Confirm SignUp
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

export default SignUp
