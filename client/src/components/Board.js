import React from 'react'
import ListContainer from '../containers/ListContainer'
import { DragDropContext } from 'react-beautiful-dnd'

const Board = ({
  handleClick,
  name,
  lists,
  handleBoardNameChange,
  currentUser,
  showBoardNameDisplay,
  handleHideBoardNameDisplay,
  handleOnDragEnd,
}) => {
  let boardLists
  if (lists) {
    boardLists = lists.map(list => {
      return <ListContainer id={list._id} key={list._id} />
    })
  }

  let activeBoard = currentUser.boards.filter(board => {
    return JSON.stringify(board._id) === JSON.stringify(currentUser.activeBoard)
  })

  console.log('name display ' + showBoardNameDisplay)

  let boardNameDisplayClasses = showBoardNameDisplay
    ? 'board-name-display'
    : 'board-name-display hidden'

  let boardNameInputClasses = showBoardNameDisplay
    ? 'input is-large has-text-dark has-background-white-bis hidden'
    : 'input is-large has-text-dark has-background-white-bis'

  console.log('active board ' + JSON.stringify(activeBoard[0].name))
  return (
    <div className="board">
      <div className="is-size-4 board-name">
        <div>
          <input
            id="board-name"
            className={boardNameInputClasses}
            type="text"
            onBlur={handleBoardNameChange}
            defaultValue={activeBoard[0].name}
            placeholder={showBoardNameDisplay ? 'Enter Board Name...' : ''}
          />
        </div>
        <div
          className={boardNameDisplayClasses}
          onClick={handleHideBoardNameDisplay}
        >
          {activeBoard[0].name ? activeBoard[0].name : 'Enter Board Name...'}
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {boardLists}
      </DragDropContext>
      <button
        className="button add-list is-light is-large is-outlined is-primary"
        onClick={handleClick}
      >
        Add A List...
      </button>
    </div>
  )
}

export default Board
