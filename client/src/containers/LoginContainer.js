import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import {
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleSubmit,
} from '../actions'
import { Redirect } from 'react-router-dom'

class LoginContainer extends Component {
  render() {
    const {
      onUsernameChange,
      onPasswordChange,
      onSubmit,
      redirect,
      currentUser,
    } = this.props

    console.log(redirect)

    if (redirect === `/${currentUser.username}`) {
      return <Redirect to={`/${currentUser.username}`} />
    }
    return (
      <Login
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
        redirect={redirect}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    redirect: state.redirect,
    currentUser: state.currentUser,
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
      dispatch(handleSubmit(e, '/login'))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
