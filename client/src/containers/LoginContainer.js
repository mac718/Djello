import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import {
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleLogIn,
} from '../actions'

class LoginContainer extends Component {
  render() {
    const { onUsernameChange, onPasswordChange, onSubmit } = this.props
    return (
      <Login
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUsernameChange: e => {
      let data = e.target.value
      console.log(data)
      dispatch(handleUsernameInputChange(data))
    },

    onPasswordChange: e => {
      let data = e.target.value
      console.log(data)
      dispatch(handlePasswordInputChange(data))
    },

    onSubmit: e => {
      dispatch(handleLogIn(e))
    },
  }
}

export default connect(null, mapDispatchToProps)(LoginContainer)
