import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import {
  createList,
  changeName,
  changeShowBoardNameDisplay,
  onDragEnd,
} from '../actions'

class BoardContainer extends Component {
  render() {
    const {
      handleClick,
      currentUser,
      currentBoard,
      handleBoardNameChange,
      showBoardNameDisplay,
      handleHideBoardNameDisplay,
      handleOnDragEnd,
      lists,
    } = this.props

    if (currentBoard && currentBoard[0]) {
      console.log('BoardContainer ' + JSON.stringify(currentBoard))
      return (
        <Board
          handleClick={handleClick}
          lists={lists}
          currentBoard={currentBoard}
          handleBoardNameChange={handleBoardNameChange}
          currentUser={currentUser}
          showBoardNameDisplay={showBoardNameDisplay}
          handleHideBoardNameDisplay={handleHideBoardNameDisplay}
          handleOnDragEnd={handleOnDragEnd}
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
    showBoardNameDisplay: state.showBoardNameDisplay,
    lists: state.activeBoardLists,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (e) => {
      dispatch(createList(e))
    },

    handleBoardNameChange: (e) => {
      let componentName = e.target.value
      e.target.value = ''

      dispatch(changeName(e, componentName, '/changeBoardName'))
      dispatch(changeShowBoardNameDisplay())
    },

    handleHideBoardNameDisplay: () => {
      dispatch(changeShowBoardNameDisplay())
    },

    handleOnDragEnd: (result) => {
      dispatch(onDragEnd(result))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
