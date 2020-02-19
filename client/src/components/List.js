import React from 'react'

const List = ({ cards }) => {
  return (
    <div className="list tile is-2 is-vertical is-parent notification is-secondary">
      {cards}
      <button className="button is-primary is-light">Add Task</button>
    </div>
  )
}

export default List
