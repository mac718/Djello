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
  handleEditCardTitle,
  handleEditCardDescription,
  handleUpdateCardTitle,
  handleUpdateCardDescription,
  handleAddMemberToCard,
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
  handleShowAddItemForm,
  handleHideAddItemForm,
  showChecklistItemForm,
  handleCreateChecklist,
  handleAddChecklistItem,
  handleCheckItem,
  handleDisplayChecklistTitleForm,
  handleHideChecklistTitleForm,
  showChecklistTitleForm,
  handleUpdateChecklistTitle,
  handleDeleteChecklist,
  handleOpenAddMemberDropdown,
  showAddMemberDropdown,
  handleActivateMemberListDropdown,
  showMemberListDropdown,
  handleEditChecklistItemForm,
  handleShowDeleteCardWarningModal,
  handleCloseDeleteCardWarningModal,
  showDeleteCardWarningModal,
  handleEditChecklistTitleForm,
  handleToggleAddAttachmentDropdown,
  handleCloseAddAttachmentDropdown,
  showAddAttachmentDropdown,
  handleUploadFile,
  handleOpenAttachmentModal,
  showAttachmentModal,
}) => {
  let classes
  if (activeCardModal === cardId) {
    classes = `modal is-active is clipped ${cardId}`
  } else {
    classes = `modal ${cardId}`
  }

  let currentBoard = currentUser.boards.filter((board) => {
    return JSON.stringify(board._id) === JSON.stringify(currentUser.activeBoard)
  })[0]

  //console.log('current card ' + currentCard)

  console.log('currentBoard ' + JSON.stringify(currentBoard))
  console.log('lists ' + JSON.stringify(lists[0]._id))
  console.log('listId ' + JSON.stringify(listId))

  let membersList

  console.log(JSON.stringify(currentList))

  let currentCard = currentList.cards.filter((listCard) => {
    return JSON.stringify(listCard._id) === JSON.stringify(cardId)
  })[0]

  if (currentCard.members) {
    membersList = currentCard.members.map((member) => {
      return (
        <div className="member" key={member}>
          {member}
        </div>
      )
    })
  }

  let totalChecklistItems = 0
  let checkedChecklistItems = 0

  if (currentCard.checklists) {
    currentCard.checklists.forEach((checklist) => {
      totalChecklistItems += checklist.items.length

      checkedChecklistItems += checklist.items.filter((item) => {
        return item.checked
      }).length
    })
  }

  let checklistIcon

  if (totalChecklistItems > 0) {
    checklistIcon = (
      <span className="card-icon has-text-grey">
        <i className="far fa-check-square"></i> {checkedChecklistItems}/
        {totalChecklistItems}
      </span>
    )
  } else {
    checklistIcon = null
  }

  let totalAttachments = 0

  if (currentCard.attachments) {
    totalAttachments = currentCard.attachments.length
  }

  let attachmentIcon

  if (totalAttachments > 0) {
    attachmentIcon = (
      <span className="card-icon has-text-grey">
        <i className="fas fa-paperclip"></i> {totalAttachments}
      </span>
    )
  } else {
    totalAttachments = null
  }

  console.log('totalChecklistItems ' + totalChecklistItems)
  console.log('checkedCheklist ' + checkedChecklistItems)

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          provided={provided}
          ref={provided.innerRef}
        >
          <div
            id={cardId}
            className={snapshot.isDragging ? 'card is-dragging' : 'card'}
            data-target={cardId}
            aria-haspopup="true"
            onClick={handleActiveCardModal}
          >
            <CardMemberList members={membersList} />
            <div className="card-content task is-hovered">{title}</div>
            <div className="card-icons">
              {checklistIcon} {attachmentIcon}
            </div>
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
            handleUpdateCardTitle={handleUpdateCardTitle}
            handleUpdateCardDescription={handleUpdateCardDescription}
            handleAddMemberToCard={handleAddMemberToCard}
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
            currentCard={currentCard}
            handleShowAddItemForm={handleShowAddItemForm}
            handleHideAddItemForm={handleHideAddItemForm}
            showChecklistItemForm={showChecklistItemForm}
            handleCreateChecklist={handleCreateChecklist}
            handleAddChecklistItem={handleAddChecklistItem}
            handleCheckItem={handleCheckItem}
            handleDisplayChecklistTitleForm={handleDisplayChecklistTitleForm}
            handleHideChecklistTitleForm={handleHideChecklistTitleForm}
            showChecklistTitleForm={showChecklistTitleForm}
            handleUpdateChecklistTitle={handleUpdateChecklistTitle}
            handleDeleteChecklist={handleDeleteChecklist}
            handleOpenAddMemberDropdown={handleOpenAddMemberDropdown}
            showAddMemberDropdown={showAddMemberDropdown}
            handleActivateMemberListDropdown={handleActivateMemberListDropdown}
            showMemberListDropdown={showMemberListDropdown}
            handleEditCardTitle={handleEditCardTitle}
            handleEditCardDescription={handleEditCardDescription}
            handleEditChecklistItemForm={handleEditChecklistItemForm}
            handleShowDeleteCardWarningModal={handleShowDeleteCardWarningModal}
            handleCloseDeleteCardWarningModal={
              handleCloseDeleteCardWarningModal
            }
            showDeleteCardWarningModal={showDeleteCardWarningModal}
            handleEditChecklistTitleForm={handleEditChecklistTitleForm}
            handleToggleAddAttachmentDropdown={
              handleToggleAddAttachmentDropdown
            }
            handleCloseAddAttachmentDropdown={handleCloseAddAttachmentDropdown}
            showAddAttachmentDropdown={showAddAttachmentDropdown}
            handleUploadFile={handleUploadFile}
            handleOpenAttachmentModal={handleOpenAttachmentModal}
            showAttachmentModal={showAttachmentModal}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Card
