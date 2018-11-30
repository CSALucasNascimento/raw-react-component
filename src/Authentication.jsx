import React, { Component } from 'react'

//  AWS Amplify Libs
import { Authenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify'

// AWS Configuration
import awsconfig from './aws-exports'

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

import store, { AmplifyBridge } from './store'
new AmplifyBridge(store);

import {
  SignIn,
  ConfirmSignIn,
  SignUp,
  ConfirmSignUp,
} from './Auth';

const CustomAuthenticator = props => (
  <Authenticator hideDefault>
    <SignIn />
    <ConfirmSignIn />
    <SignUp />
    <ConfirmSignUp />
  </Authenticator>
)

export default class Authentication extends Component {

  constructor(props) {
    super(props);
    this.storeListener = this.storeListener.bind(this);
    this.state = { user: null }
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(this.storeListener);
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  storeListener() {
    this.setState({ user: store.getState().user });
  }

  render() {

    const { user } = this.state

    return (
        !user ? <CustomAuthenticator />
        : `You are signed in as ${user.username}`
    )
  }
}
