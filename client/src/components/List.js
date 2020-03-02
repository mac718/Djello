import React from 'react'

const List = ({ cards, name, id, deleteList }) => {
  return (
    <div
      id={id}
      className="list tile is-2 is-vertical is-parent notification is-secondary"
    >
      <div className="list-name is-size-5">
        Name{name}
        {id}
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
