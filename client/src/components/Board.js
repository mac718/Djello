import React from 'react'
import List from './List'
import ListContainer from '../containers/ListContainer'
import { DragDropContext } from 'react-beautiful-dnd'

const Board = ({
  handleClick,
  //name,
  lists,
  handleBoardNameChange,
  currentUser,
  showBoardNameDisplay,
  handleHideBoardNameDisplay,
  handleOnDragEnd,
}) => {
  console.log('list lists ' + JSON.stringify(lists))
  let boardLists = 'hello'
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

  console.log('active board ' + JSON.stringify(activeBoard[0].name))
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="board has-background-white-bis">
        <div className="is-size-4 board-name">
          <div>
            <input
              id="board-name"
              className="input is-large has-text-dark has-background-white-bis"
              type="text"
              defaultValue={activeBoard[0].name}
              onBlur={handleBoardNameChange}
              onFocus={handleHideBoardNameDisplay}
              placeholder="Enter Board Name..."
            />
          </div>
          <div className={boardNameDisplayClasses}>{activeBoard[0].name}</div>
        </div>

        {boardLists}
        <button
          className="button add-list is-light is-large is-outlined is-primary"
          onClick={handleClick}
        >
          Add A List...
        </button>
      </div>
    </DragDropContext>
  )
}

export default Board
