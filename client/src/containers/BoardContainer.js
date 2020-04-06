import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import {
  createList,
  changeName,
  changeShowBoardNameDisplay,
  onDragEnd,
} from '../actions'
import { DragDropContext } from 'react-beautiful-dnd'

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
    let name
    //let lists
    console.log(currentBoard)
    if (currentBoard && currentBoard[0]) {
      name = currentBoard[0].name
      //lists = currentBoard[0].lists

      console.log('BoardContainer ' + JSON.stringify(currentBoard))
      return (
        <Board
          handleClick={handleClick}
          name={name}
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
  console.log('lists ' + JSON.stringify(state.activeBoardLists))
  return {
    currentUser: state.currentUser,
    currentBoard: ownProps.currentBoard,
    showBoardNameDisplay: state.showBoardNameDisplay,
    lists: state.activeBoardLists,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(createList(e))
    },

    handleBoardNameChange: e => {
      let componentName = e.target.value
      e.target.value = ''

      dispatch(changeName(e, componentName, '/changeBoardName'))
      dispatch(changeShowBoardNameDisplay())
    },

    handleHideBoardNameDisplay: () => {
      dispatch(changeShowBoardNameDisplay())
    },

    handleOnDragEnd: result => {
      dispatch(onDragEnd(result))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
