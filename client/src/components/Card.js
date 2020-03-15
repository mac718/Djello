import React from 'react'
import CardModal from './CardModal'

const Card = ({
  handleContentChange,
  title,
  activeCardModal,
  handleActiveCardModal,
  id,
  handleDeleteCard,
  listId,
}) => {
  let classes
  if (activeCardModal === id) {
    classes = `modal is-active is clipped ${id}`
  } else {
    classes = `modal ${id}`
  }
  return (
    <div>
      <div
        id={id}
        className="card"
        data-target={id}
        aria-haspopup="true"
        onClick={handleActiveCardModal}
      >
        <div className="card-content textarea task is-hovered">{title}</div>
      </div>
      <CardModal
        id={id}
        title={title}
        classes={classes}
        handleActiveCardModal={handleActiveCardModal}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
      />
    </div>
  )
}

export default Card
