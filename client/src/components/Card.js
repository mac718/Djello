import React from 'react'
import CardModal from './CardModal'
import CardMemberList from './CardMemberList'
import { Draggable } from 'react-beautiful-dnd'

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
  handleDeleteMemberFromCard,
  index,
  lists,
  currentList,
  //currentCard,
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
  console.log('lists ' + JSON.stringify(lists[0]._id))
  console.log('listId ' + JSON.stringify(listId))

  let membersList

  console.log(JSON.stringify(currentList))

  let currentCard = currentList.cards.filter(listCard => {
    return JSON.stringify(listCard._id) === JSON.stringify(cardId)
  })[0]

  if (currentCard.members) {
    membersList = currentCard.members.map(member => {
      return (
        <div className="member" key={member}>
          {member}
        </div>
      )
    })
  }

  console.log('index ' + index)

  return (
    <Draggable draggableId={cardId} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          provided={provided}
          ref={provided.innerRef}
        >
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
            handleSwitchToCardDescriptionForm={
              handleSwitchToCardDescriptionForm
            }
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
            handleCloseDuplicateMemberWarning={
              handleCloseDuplicateMemberWarning
            }
            handleDeleteMemberFromCard={handleDeleteMemberFromCard}
            lists={lists}
            currentList={currentList}
            //currentCard={currentCard}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Card
