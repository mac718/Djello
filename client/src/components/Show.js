import React from 'react'
import Board from './Board'
import BoardContainer from '../containers/BoardContainer'

const Show = ({ handleLogoutClick, handleCreateBoard, currentUser }) => {
  console.log(currentUser.activeBoard)
  var boards = []
  if (currentUser.boards) {
    boards = currentUser.boards.map(board => {
      return <BoardContainer />
    })
  }

  var activeBoard = []
  if (currentUser.activeBoard) {
    activeBoard = currentUser.boards.filter(board => {
      return board._id === currentUser.activeBoard
    })
  }

  activeBoard = <BoardContainer currentBoard={activeBoard} />
  console.log(activeBoard)

  return (
    <div className="show">
      <div className="section">
        <nav
          className="navbar has-background-grey-light is-fixed-top"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <div className="navbar-item is-size-1 is-family-secondary has-text-white">
              DJELLO
            </div>
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
      </div>
      <nav
        className="navbar board-dropdown"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div className="navbar-item has-dropdown">
          <a className="navbar-link">Docs</a>

          <div className="navbar-dropdown">
            <a className="navbar-item">Overview</a>
            <a className="navbar-item">Elements</a>
            <a className="navbar-item">Components</a>
            <hr className="navbar-divider" />
            <div className="navbar-item">Version 0.8.0</div>
          </div>
        </div>
      </nav>
      <div className="current-board">{activeBoard}</div>
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
