import React from 'react'
import ShowContainer from '../containers/ShowContainer'

const Board = ({ handleClick, name, lists }) => {
  return (
    <div className="board container is-fluid">
      <div className="is-size-4">{name}</div>
      {lists}
      {/* <button className="button add-list is-light is-medium">
        Add A List...
      </button> */}
    </div>
  )
}

export default Board
