import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { createList } from '../actions'

class BoardContainer extends Component {
  render() {
    const { handleClick, currentUser, currentBoard } = this.props
    let name
    let lists
    console.log(currentBoard)
    if (currentBoard && currentBoard[0]) {
      name = currentBoard[0].name
      lists = currentBoard[0].lists

      console.log('BoardContainer ' + JSON.stringify(currentBoard))
      return (
        <Board
          handleClick={handleClick}
          name={name}
          lists={lists}
          currentBoard={currentBoard}
        />
      )
    } else {
      return (
        <div className="no-board is-size-2 has-text-danger">
          no board selected
        </div>
      )
    }
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
