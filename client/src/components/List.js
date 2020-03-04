import React from 'react'

const List = ({ cards, name, id, deleteList, handleListNameChange }) => {
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
