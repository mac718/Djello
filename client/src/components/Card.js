import React from 'react'
import CardModal from './CardModal'
import CardMemberList from './CardMemberList'

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

  let membersList = currentCard.members.map(member => {
    return (
      <li className="member" key={member}>
        {member}
      </li>
    )
  })

  return (
    <div>
      <div
        id={cardId}
        className="card"
        data-target={cardId}
        aria-haspopup="true"
        onClick={handleActiveCardModal}
      >
        <CardMemberList members={membersList} />
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
