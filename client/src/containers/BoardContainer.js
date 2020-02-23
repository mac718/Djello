import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { createList } from '../actions'

class BoardContainer extends Component {
  render() {
    const { handleClick, currentUser, currentBoard } = this.props

    let name = currentBoard[0].name
    let lists = currentBoard[0].lists
    console.log('BoardContainer ' + JSON.stringify(currentBoard))
    return (
      <Board
        handleClick={handleClick}
        name={name}
        lists={lists}
        currentBoard={currentBoard}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser,
    currentBoard: ownProps.currentBoard,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(createList(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
