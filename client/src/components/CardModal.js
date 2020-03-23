import React from 'react'
import CardDescriptionForm from './CardDescriptionForm'
import CardDescriptionDisplay from './CardDescriptionDisplay'

const CardModal = ({
  currentUser,
  title,
  description,
  members,
  classes,
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
  console.log('listId ' + listId)
  console.log('carId ' + cardId)
  let currentBoard = currentUser.boards.filter(board => {
    return JSON.stringify(board._id) === JSON.stringify(currentUser.activeBoard)
  })[0]

  console.log('currentBoard ' + JSON.stringify(currentBoard))

  let currentList = currentBoard.lists.filter(boardList => {
    return JSON.stringify(boardList._id) === JSON.stringify(listId)
  })[0]

  let currentCard = currentList.cards.filter(listCard => {
    return JSON.stringify(listCard._id) === JSON.stringify(cardId)
  })[0]

  let descriptionForm = (
    <CardDescriptionForm
      description={description}
      handleCardDescriptionEdit={handleCardDescriptionEdit}
      handleCardDescriptionUpdate={handleCardDescriptionUpdate}
      handleSwitchToCardDescriptionDisplay={
        handleSwitchToCardDescriptionDisplay
      }
      listName={listId}
      cardId={cardId}
    />
  )

  let descriptionDisplay = (
    <CardDescriptionDisplay
      description={currentCard.description}
      handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
    />
  )

  let descriptionComponent = showCardDescriptionForm
    ? descriptionForm
    : descriptionDisplay

  return (
    <div id={cardId} className={classes}>
      <span id={listId}></span>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <p>In list {listName}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleActiveCardModal}
          ></button>
        </div>
        <div className="modal-card-body">
          <button
            className="button is-primary is-light"
            onClick={handleDeleteCard}
          >
            Mark as Complete
          </button>
          {descriptionComponent}
          <div className="members">
            <p className="is-size-4">Members</p>
          </div>
          <div className="modal-card-footer">
            <p className="is-size-4">Activity</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal
