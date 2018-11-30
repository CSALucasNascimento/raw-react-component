import React from 'react'
import './ConfirmSignIn.scss'
import { Auth } from 'aws-amplify'

class ConfirmSignIn extends React.Component {

  constructor(props) {
    super(props)
    this.inputs = {}
    this.state = this.getInitialState()
  }

  getInitialState = () => ({
    error: '',
    message: ''
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
    const user = this.props.authData;
    const { code } = this.inputs;
    Auth.confirmSignIn(user, code, null)
      .then(() => this.handleSuccess())
      .catch(err => this.handleError(err));
  }

  handleSuccess = () => {
    this.getInitialState();
  }

  handleError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  render() {

    const { authState } = this.props;
    if (authState !== 'confirmSignIn') { return null; }

    const { error, message } = this.state;
    
    return (
      <div className="confirmSignUp">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Code</label>
            <input type="text" name="code" className="form-control" placeholder="123 123" onChange={this.handleChange} required />
            <div className="invalid-feedback">
                Please insert the code.
            </div>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">Check me out</label>
          </div>
          <button type="button" className="btn btn-secondary" onClick={this.changeState('signIn')}>
            Back to Sign In
          </button>
          <button type="submit" className="btn btn-primary">
            Confirm Code
          </button>
          { error && <div className="alert alert-danger fixed-bottom" role="alert">{error}</div> }
          { message && <div className="alert alert-warning fixed-bottom" role="alert">{message}</div> }
        </form>
      </div>
    )
  }
}

export default ConfirmSignIn
