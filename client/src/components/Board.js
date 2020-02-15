import React from 'react'
import ShowContainer from '../containers/ShowContainer'

const Board = ({ handleClick }) => {
  return (
    <div className="board container is-fluid">
      <ShowContainer />
      <button className="button add-list is-light is-medium">
        Add A List...
      </button>
    </div>
  )
}

export default Board
