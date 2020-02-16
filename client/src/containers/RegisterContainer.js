import React, { Component } from 'react'
import { connect } from 'react-redux'
import Register from '../components/Register'
import {
  handleUsernameInputChange,
  handlePasswordInputChange,
  handleSubmit,
} from '../actions'
import { Redirect } from 'react-router-dom'

class RegisterContainer extends Component {
  render() {
    const {
      onUsernameChange,
      onPasswordChange,
      onSubmit,
      redirect,
      currentUser,
    } = this.props
    if (redirect === `/${currentUser.username}`) {
      return <Redirect to={`/${currentUser.username}`} />
    }
    return (
      <Register
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        onSubmit={onSubmit}
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
      dispatch(handleSubmit(e, '/register'))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
