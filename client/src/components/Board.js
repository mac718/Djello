import React from 'react'

const Board = ({ onClick }) => {
  return (
    <div className="Board">
      Hello, I'm a board!
      <button className="button" onClick={onClick}>
        Log Out
      </button>
    </div>
  )
}

export default Board
