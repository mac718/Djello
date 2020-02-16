import React from 'react'
import Board from './Board'

const Show = ({ handleLogoutClick, handleCreateBoard, currentUser }) => {
  console.log(JSON.stringify(currentUser))
  if (currentUser.boards) {
    const boards = currentUser.boards.map(board => {
      return <Board name={board.name} lists={board.lists} key={board.id} />
    })
  }

  var activeBoard = []
  if (currentUser.activeBoard) {
    activeBoard = (
      <Board
        name={currentUser.activeBoard.name}
        lists={currentUser.activeBoard.lists}
      />
    )
  }
  console.log(activeBoard)

  return (
    <div className="show">
      <nav
        className="navbar has-background-grey-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <p className="navbar-item is-size-1 is-family-secondary has-text-white">
            Djello
          </p>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="logout">
              <a
                className="button is-danger is-light"
                onClick={handleLogoutClick}
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="current-board"></div>
      {/* <div className="create-board">
        <button
          className="button is-success is-large"
          onClick={handleCreateBoard}
        >
          Create a new board!
        </button>
  </div> */}
      show
    </div>
  )
}

export default Show
