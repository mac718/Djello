import React from 'react'
import CardDescriptionForm from './CardDescriptionForm'
import CardDescriptionDisplay from './CardDescriptionDisplay'
import CardTitleForm from './CardTitleForm'
import CardTitleDisplay from './CardTitleDisplay'
import MemberDropdown from './MemberDropdown'

const CardModal = ({
  currentUser,
  attributeContent,
  members,
  classes,
  handleActiveCardModal,
  cardId,
  handleDeleteCard,
  listId,
  listName,
  handleCardAttributeEdit,
  handleCardAttributeUpdate,
  handleSwitchToCardDescriptionForm,
  handleSwitchToCardDescriptionDisplay,
  handleSwitchToCardTitleForm,
  handleSwitchToCardTitleDisplay,
  showCardDescriptionForm,
  showCardTitleForm,
  isLoading,
  handleSelectMemberFromDropdown,
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
      description={currentCard.description}
      handleCardAttributeEdit={handleCardAttributeEdit}
      handleCardAttributeUpdate={handleCardAttributeUpdate}
      handleSwitchToCardDescriptionDisplay={
        handleSwitchToCardDescriptionDisplay
      }
      listName={listId}
      cardId={cardId}
    />
  )

  let descriptionDisplay = (
    <CardDescriptionDisplay
      description={isLoading ? attributeContent : currentCard.description}
      handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
    />
  )

  let titleForm = (
    <CardTitleForm
      title={currentCard.title}
      handleCardAttributeEdit={handleCardAttributeEdit}
      handleCardAttributeUpdate={handleCardAttributeUpdate}
      handleSwitchToCardTitleDisplay={handleSwitchToCardTitleDisplay}
    />
  )

  let titleDisplay = (
    <CardTitleDisplay
      title={isLoading ? attributeContent : currentCard.title}
      handleSwitchToCardTitleForm={handleSwitchToCardTitleForm}
    />
  )

  let descriptionComponent = showCardDescriptionForm
    ? descriptionForm
    : descriptionDisplay

  let titleComponent = showCardTitleForm ? titleForm : titleDisplay

  let membersList = currentCard.members.map(member => {
    return (
      <li className="member" key={member}>
        {member}
      </li>
    )
  })

  return (
    <div id={cardId} className={classes}>
      <span id={listId}></span>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <div className="modal-card-title">{titleComponent}</div>
          <p>In list {listName}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleActiveCardModal}
          ></button>
        </div>
        <div className="modal-card-body">
          <button
            className="button is-link is-light is-outlined mark-as-complete"
            onClick={handleDeleteCard}
          >
            <span class="icon is-small">
              <i class="fas fa-check"></i>
            </span>
            <span>Mark as Complete</span>
          </button>
          {descriptionComponent}
          <div className="members">
            <p className="is-size-4">Members</p>
            <MemberDropdown
              members={members}
              handleSelectMemberFromDropdown={handleSelectMemberFromDropdown}
              handleCardAttributeUpdate={handleCardAttributeUpdate}
            />
          </div>
          <div className="content">
            <ul>{membersList}</ul>
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
