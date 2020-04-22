import React from 'react'
import BoardContainer from '../containers/BoardContainer'
import { Redirect } from 'react-router-dom'

const Show = ({
  handleLogoutClick,
  handleCreateBoard,
  currentUser,
  handleDeleteBoard,
  handleActiveBoardSwitch,
  redirect,
  handleShowDeleteBoardWarningModal,
  handleCloseDeleteBoardWarningModal,
  showDeleteBoardWarningModal,
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
    console.log(JSON.stringify(currentUser.boards))
    dropdownItems = currentUser.boards.map((board, i) => {
      console.log(i + ' ' + board._id)
      return (
        <a
          className="navbar-item has-text-black"
          id={board._id}
          onClick={handleActiveBoardSwitch}
          key={board._id + '1'}
        >
          {board.name ? board.name : `board ${i + 1}`}
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

  if (redirect === '/login') {
    return <Redirect to={redirect} />
  }

  let deleteBoardWarningModalClasses = showDeleteBoardWarningModal
    ? 'modal is-active'
    : 'modal'

  let deleteBoardWarningModal = (
    <div class={deleteBoardWarningModalClasses}>
      <div class="modal-background"></div>
      <div class="modal-content">
        <div className="box">
          <p>
            This action will permantly delete this list. Are you sure you want
            to proceed?
          </p>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-primary is-light"
                onClick={() => handleDeleteBoard(currentUser.activeBoard)}
              >
                Yes, delete the list
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light"
                onClick={handleCloseDeleteBoardWarningModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
  )

  return (
    <div className="show has-background-white-bis">
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
            <div id="board-dropdown-board-buttons-container">
              <div class="dropdown board-dropdown is-hoverable is-right">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu4"
                  >
                    <span>Boards</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">{dropdownItems}</div>
                  </div>
                </div>
              </div>
              <div id="add-delete-board">
                <button
                  // className="button is-primary is-light is-large is-outlined create-board-button"
                  className="button is-primary is-light create-board-button"
                  title="create new board"
                  onClick={handleCreateBoard}
                >
                  <span className="icon is-small">
                    <i className="fas fa-plus"></i>
                  </span>
                </button>
                <button
                  className="button is-danger is-light delete-board-button"
                  title="delete current board"
                  onClick={handleShowDeleteBoardWarningModal}
                >
                  <span className="icon is-small">
                    <i className="fas fa-minus-circle"></i>
                  </span>
                  {/* <span>Delete Current Board</span> */}
                </button>
              </div>
            </div>
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
      {deleteBoardWarningModal}
    </div>
  )
}

export default Show
