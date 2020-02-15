import React, { Component } from 'react'
import { connect } from 'react-redux'
import Show from '../components/Show'
import { handleLogOut, createBoard } from '../actions'

class ShowContainer extends Component {
  render() {
    const { handleLogoutClick, handleCreateBoard, currentBoard } = this.props
    return (
      <Show
        handleLogoutClick={handleLogoutClick}
        handleCreateBoard={handleCreateBoard}
        currentBoard={currentBoard}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentBoard: state.currentBoard,
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

export default connect(null, mapDispatchToProps)(ShowContainer)
