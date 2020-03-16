import React from 'react'
import CardModal from './CardModal'

const Card = ({
  handleContentChange,
  title,
  activeCardModal,
  handleActiveCardModal,
  cardId,
  handleDeleteCard,
  listId,
  listName,
  handleDescriptionChange,
}) => {
  let classes
  if (activeCardModal === cardId) {
    classes = `modal is-active is clipped ${cardId}`
  } else {
    classes = `modal ${cardId}`
  }
  return (
    <div>
      <div
        id={cardId}
        className="card"
        data-target={cardId}
        aria-haspopup="true"
        onClick={handleActiveCardModal}
      >
        <div className="card-content textarea task is-hovered">{title}</div>
      </div>
      <CardModal
        cardId={cardId}
        title={title}
        classes={classes}
        handleActiveCardModal={handleActiveCardModal}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
        listName={listName}
        handleDescriptionChange={handleDescriptionChange}
      />
    </div>
  )
}

export default Card
