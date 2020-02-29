import React from 'react'

const List = ({ cards, name, id }) => {
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
    </div>
  )
}

export default List
