import React, { Component } from 'react'
import Board from '../components/Board'
import { handleLogOut } from '../actions'
import { connect } from 'react-redux'

class BoardContainer extends Component {
  render() {
    const { handleClick, currentUser } = this.props
    let name = currentUser.activeBoard.name
    let lists = currentUser.activeBoard.lists
    return <Board handleClick={handleLogOut} name={name} lists={lists} />
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
