import React, { Component } from 'react'
import { connect } from 'react-redux'
import Show from '../components/Show'
import { handleLogOut, createBoard } from '../actions'

class ShowContainer extends Component {
  render() {
    const { handleLogoutClick, handleCreateBoard, currentUser } = this.props
    console.log(currentUser)
    return (
      <Show
        handleLogoutClick={handleLogoutClick}
        handleCreateBoard={handleCreateBoard}
        currentUser={currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogoutClick: e => {
      dispatch(handleLogOut(e))
    },

    handleCreateBoard: e => {
      dispatch(createBoard(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)
