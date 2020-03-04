import React from 'react'

const List = ({ cards, currentUser, id, deleteList, handleListNameChange }) => {
  let currentBoard = currentUser.boards.filter(board => {
    return board._id === currentUser.activeBoard
  })

  let currentList = currentBoard[0].lists.filter(list => {
    return id === list._id
  })

  let name = currentList[0].name

  return (
    <div
      id={id}
      className="list tile is-2 is-vertical is-parent notification is-secondary"
    >
      <div className="list-name is-size-5">
        <input
          id="board-name"
          className="input"
          type="text"
          placeholder="Enter List Name"
          defaultValue={name}
          onBlur={handleListNameChange}
        />
      </div>
      {cards}
      <button className="button is-primary is-light">Add Task</button>
      <button className="button is-danger is-light" onClick={deleteList}>
        Delete List
      </button>
    </div>
  )
}

export default List
