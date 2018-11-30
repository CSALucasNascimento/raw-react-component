import React from 'react'
import './ConfirmSignUp.scss'
import { Auth } from 'aws-amplify'

class ConfirmSignUp extends React.Component {

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
    const username = this.props.authData || this.inputs.username;
    const { code } = this.inputs;
    Auth.confirmSignUp(username, code)
      .then(() => this.handleSuccess(username))
      .catch(err => this.handleError(err))
  }

  handleSuccess = () => {
    this.setState({ message: 'Code accepted' })
    this.getInitialState();
  }

  handleError = (err) => {
    let message = err.message || err
    this.setState({ error: message })
  }

  resendCode = () => {
    const username = this.props.authData || this.inputs.username;
    logger.info('resend code to ' + username);
    Auth.resendSignUp(username)
      .then(() => this.setState({ message: 'Code sent' }))
      .catch(err => this.handleError(err));
  }

  render() {

    const { authState } = this.props;
    if (authState !== 'confirmSignUp') { return null; }
    
    console.log(authState)

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
          <button type="button" className="btn btn-secondary" onClick={() => this.changeState('signIn')}>
            Back to Sign In
          </button>
          <button type="submit" className="btn btn-primary">
            Confirm Code
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.resendCode}>
            Resend Code
          </button>
          { error && <div className="alert alert-danger fixed-bottom" role="alert">{error}</div> }
          { message && <div className="alert alert-warning fixed-bottom" role="alert">{message}</div> }
        </form>
      </div>
    )
  }
}

export default ConfirmSignUp
