import React from 'react'
import Board from './Board'
import BoardContainer from '../containers/BoardContainer'

const Show = ({ handleLogoutClick, handleCreateBoard, currentUser }) => {
  console.log(currentUser.activeBoard)
  var boards = []
  if (currentUser.boards) {
    boards = currentUser.boards.map(board => {
      return <Board name={board.name} lists={board.lists} key={board.id} />
    })
  }

  var activeBoard = []
  if (currentUser.activeBoard) {
    activeBoard = <BoardContainer />
  }
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
      </div>
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
