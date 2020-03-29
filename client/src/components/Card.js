import React from 'react'
import CardModal from './CardModal'
import { is } from 'bluebird'

const Card = ({
  currentUser,
  attributeContent,
  activeCardModal,
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
  title,
  userList,
  handleSelectMemberFromDropdown,
  showDuplicateMemberWarning,
  handleCloseDuplicateMemberWarning,
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
        attributeContent={attributeContent}
        classes={classes}
        handleActiveCardModal={handleActiveCardModal}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
        listName={listName}
        handleCardAttributeEdit={handleCardAttributeEdit}
        handleCardAttributeUpdate={handleCardAttributeUpdate}
        handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
        showCardDescriptionForm={showCardDescriptionForm}
        handleSwitchToCardDescriptionDisplay={
          handleSwitchToCardDescriptionDisplay
        }
        handleSwitchToCardTitleForm={handleSwitchToCardTitleForm}
        handleSwitchToCardTitleDisplay={handleSwitchToCardTitleDisplay}
        showCardTitleForm={showCardTitleForm}
        isLoading={isLoading}
        members={userList}
        handleSelectMemberFromDropdown={handleSelectMemberFromDropdown}
        showDuplicateMemberWarning={showDuplicateMemberWarning}
        handleCloseDuplicateMemberWarning={handleCloseDuplicateMemberWarning}
      />
    </div>
  )
}

export default Card
