import React from 'react'
import List from './List'
import ListContainer from '../containers/ListContainer'

const Board = ({
  handleClick,
  name,
  lists,
  handleBoardNameChange,
  currentUser,
}) => {
  let boardLists = 'hello'
  if (lists) {
    boardLists = lists.map(list => {
      return <ListContainer id={list._id} key={list._id} />
    })
  }

  let activeBoard = currentUser.boards.filter(board => {
    return JSON.stringify(board._id) === JSON.stringify(currentUser.activeBoard)
  })

  console.log('active board ' + JSON.stringify(activeBoard[0].name))
  return (
    <div className="board">
      <div className="is-size-4">
        <input
          id="board-name"
          className="input is-large"
          type="text"
          onBlur={handleBoardNameChange}
        />
        {activeBoard[0].name}
      </div>
      {boardLists}
      <button
        className="button add-list is-light is-medium"
        onClick={handleClick}
      >
        Add A List...
      </button>
    </div>
  )
}

export default Board
