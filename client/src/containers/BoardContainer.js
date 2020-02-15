import React, { Component } from 'react'
import Board from '../components/Board'
import { handleLogOut } from '../actions'
import { connect } from 'react-redux'

class BoardContainer extends Component {
  render() {
    const { handleClick } = this.props
    return <Board handleClick={handleLogOut} />
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(handleLogOut(e))
    },
  }
}

export default connect(null, mapDispatchToProps)(BoardContainer)
