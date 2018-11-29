import React from 'react'
import './Login.scss'
import { Auth } from 'aws-amplify'

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({
    email: '',
    password: ''
  })

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
        ...this.state, [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    Auth.signIn(email, password)
        .then(user => console.log(user))
        .catch(err => console.log(err));
  }

  render() {

    const { email, password } = this.state;
    
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={ this.handleChange} required />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <div className="invalid-feedback">
                Please choose an email.
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" placeholder="********" value={password} onChange={this.handleChange} required />
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
        </form>
      </div>
    );
  }
}

export default Login
