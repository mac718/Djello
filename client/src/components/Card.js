import React from 'react'

const Card = ({
  handleContentChange,
  title,
  cardModalState,
  handleCardModalState,
}) => {
  let classes
  cardModalState
    ? (classes = 'modal is-active is clipped')
    : (classes = 'modal')
  return (
    <div>
      <div className="card" data-target="modal" aria-haspopup="true">
        <div
          className="card-content"
          className="card-content textarea task is-hovered"
          onClick={handleCardModalState}
        >
          {title}
        </div>
      </div>
      <div className={classes}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="box">
            <p>Hi</p>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={handleCardModalState}
        ></button>
      </div>
    </div>
  )
}

export default Card
