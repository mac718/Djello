import React from 'react'
import Board from './Board'
import BoardContainer from '../containers/BoardContainer'

const Show = ({
  handleLogoutClick,
  handleCreateBoard,
  currentUser,
  handleDeleteBoard,
  handleActiveBoardSwitch,
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
    //id is the same for all boards
    //need to fix board name input
    console.log(JSON.stringify(currentUser.boards))
    dropdownItems = currentUser.boards.map((board, i) => {
      console.log(i + ' ' + board._id)
      return (
        <a
          className="navbar-item"
          id={board._id}
          onClick={handleActiveBoardSwitch}
          key={board._id + '1'}
        >
          {board.name}
        </a>
      )
    })
  }

  var activeBoard
  if (currentUser.activeBoard) {
    activeBoard = currentUser.boards.filter(board => {
      return board._id === currentUser.activeBoard
    })
  }

  activeBoard = <BoardContainer currentBoard={activeBoard} />
  console.log(currentUser.activeBoard)

  return (
    <div className="show">
      <div>
        <nav
          className="navbar has-background-grey-light"
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
    </div>
  )
}

export default Show
