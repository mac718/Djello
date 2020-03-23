import React from 'react'
import CardModal from './CardModal'

const Card = ({
  currentUser,
  title,
  activeCardModal,
  handleActiveCardModal,
  cardId,
  handleDeleteCard,
  listId,
  listName,
  handleCardDescriptionEdit,
  handleCardDescriptionUpdate,
  handleSwitchToCardDescriptionForm,
  handleSwitchToCardDescriptionDisplay,
  showCardDescriptionForm,
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
        <div className="card-content task is-hovered">{title}</div>
      </div>
      <CardModal
        currentUser={currentUser}
        cardId={cardId}
        title={title}
        classes={classes}
        handleActiveCardModal={handleActiveCardModal}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
        listName={listName}
        handleCardDescriptionEdit={handleCardDescriptionEdit}
        handleCardDescriptionUpdate={handleCardDescriptionUpdate}
        handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
        showCardDescriptionForm={showCardDescriptionForm}
        handleSwitchToCardDescriptionDisplay={
          handleSwitchToCardDescriptionDisplay
        }
      />
    </div>
  )
}

export default Card
