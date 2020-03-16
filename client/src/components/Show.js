import React from 'react'
import Board from './Board'
import BoardContainer from '../containers/BoardContainer'

const Show = ({
  handleLogoutClick,
  handleCreateBoard,
  currentUser,
  handleDeleteBoard,
}) => {
  console.log('active ' + JSON.stringify(currentUser))
  let boards = []
  let boardNames = []
  let dropdownItems
  if (currentUser.boards) {
    boards = currentUser.boards.map(board => {
      boardNames.push(board.name)
      return <BoardContainer />
    })
  }

  if (boardNames.length > 0) {
    dropdownItems = boardNames.map(name => {
      return <a className="navbar-item">{name}</a>
    })
  }

  var activeBoard
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
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Boards</a>

          <div className="navbar-dropdown">{dropdownItems}</div>
        </div>
        <button
          className="button is-danger is-light"
          onClick={handleDeleteBoard}
        >
          Delete Current Board
        </button>
        <button
          className="button is-primary is-light"
          onClick={handleCreateBoard}
        >
          Create New Board
        </button>
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
    </div>
  )
}

export default Show
