import React, { Component } from 'react'
import Board from '../components/Board'
import { Redirect } from 'react-router-dom'
import { handleLogOut } from '../actions'
import { connect } from 'react-redux'

class BoardContainer extends Component {
  render() {
    const { onClick } = this.props
    return <Board onClick={handleLogOut} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: e => {
      dispatch(handleLogOut(e))
    },
  }
}

export default connect(null, mapDispatchToProps)(BoardContainer)
