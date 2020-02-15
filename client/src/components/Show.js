import React from 'react'

const Show = ({
  boards,
  handleLogoutClick,
  handleCreateBoard,
  currentBoard,
}) => {
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