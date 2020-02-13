import React, { Component } from 'react'
import { connect } from 'react-redux'
import Register from '../components/Register'
import {
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleSubmit,
} from '../actions'

class RegisterContainer extends Component {
  render() {
    const { onUsernameChange, onPasswordChange, onSubmit } = this.props
    return (
      <Register
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
      dispatch(handleSubmit(e, '/register'))
    },
  }
}

export default connect(null, mapDispatchToProps)(RegisterContainer)
