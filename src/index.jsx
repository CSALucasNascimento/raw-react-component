import React from 'react'
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports';

import Login from './Login'

Auth.configure(awsconfig);
Amplify.configure(awsconfig);

ReactDOM.render(<Login />, document.getElementById('root'))