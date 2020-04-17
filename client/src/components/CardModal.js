import React from 'react'
import CardDescriptionForm from './CardDescriptionForm'
import CardDescriptionDisplay from './CardDescriptionDisplay'
import CardTitleForm from './CardTitleForm'
import CardTitleDisplay from './CardTitleDisplay'
import MemberSelectionDropdown from './MemberSelectionDropdown'
import Checklist from './Checklist'

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
  showDuplicateMemberWarning,
  handleCloseDuplicateMemberWarning,
  handleDeleteMemberFromCard,
  lists,
  currentList,
  currentCard,
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
}) => {
  console.log('listId ' + listId)
  console.log('carId ' + cardId)
  let currentBoard = currentUser.boards.filter(board => {
    return JSON.stringify(board._id) === JSON.stringify(currentUser.activeBoard)
  })[0]

  console.log('currentBoard ' + JSON.stringify(currentBoard))

  //let currentList
  //let currentCard
  let cardActivity
  let descriptionForm
  let descriptionDisplay
  let titleForm
  let titleDisplay
  let descriptionComponent
  let titleComponent
  let membersList
  let checklists

  console.log(currentList)

  // currentCard = currentList.cards.filter(listCard => {
  //   return JSON.stringify(listCard._id) === JSON.stringify(cardId)
  // })[0]

  if (currentCard.activity) {
    cardActivity = currentCard.activity.map(action => {
      return <li key={action}>{action}</li>
    })
  }

  if (currentCard.checklists) {
    checklists = currentCard.checklists.map(checklist => {
      return (
        <Checklist
          items={checklist.items}
          handleShowAddItemForm={handleShowAddItemForm}
          handleHideAddItemForm={handleHideAddItemForm}
          showChecklistItemForm={showChecklistItemForm}
          handleCardAttributeEdit={handleCardAttributeEdit}
          handleAddChecklistItem={handleAddChecklistItem}
          handleDisplayChecklistTitleForm={handleDisplayChecklistTitleForm}
          handleHideChecklistTitleForm={handleHideChecklistTitleForm}
          cardId={cardId}
          checklistId={checklist._id}
          handleCheckItem={handleCheckItem}
          title={checklist.title}
          showChecklistTitleForm={showChecklistTitleForm}
          handleCheckItem={handleCheckItem}
          handleUpdateChecklistTitle={handleUpdateChecklistTitle}
          handleDeleteChecklist={handleDeleteChecklist}
        />
      )
    })
  }
  descriptionForm = (
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
  descriptionDisplay = (
    <CardDescriptionDisplay
      description={isLoading ? attributeContent : currentCard.description}
      handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
    />
  )
  titleForm = (
    <CardTitleForm
      title={currentCard.title}
      handleCardAttributeEdit={handleCardAttributeEdit}
      handleCardAttributeUpdate={handleCardAttributeUpdate}
      handleSwitchToCardTitleDisplay={handleSwitchToCardTitleDisplay}
    />
  )

  titleDisplay = (
    <CardTitleDisplay
      title={isLoading ? attributeContent : currentCard.title}
      handleSwitchToCardTitleForm={handleSwitchToCardTitleForm}
    />
  )

  descriptionComponent = showCardDescriptionForm
    ? descriptionForm
    : descriptionDisplay

  membersList = currentCard.members.map(member => {
    return (
      <li className="member" key={member}>
        <div className="member-username">{member}</div>
        <a className="remove-link" onClick={handleDeleteMemberFromCard}>
          remove
        </a>
      </li>
    )
  })
  titleComponent = showCardTitleForm ? titleForm : titleDisplay
  //})

  let notificationClasses = showDuplicateMemberWarning
    ? 'notification is-danger is-light'
    : 'notification is-danger is-light hidden'

  let checklistsHeading
  checklistsHeading =
    currentCard.checklists.length > 0 ? (
      <p className="is-size-4">Checklists</p>
    ) : null

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
          <div className="actions">
            <button
              className="button is-fullwidth"
              onClick={handleCreateChecklist}
            >
              Add Checklist
            </button>
            <button className="button is-fullwidth">Add Member</button>
            <button className="button is-fullwidth">Add Attachment</button>
            <button className="button is-fullwidth">Add Cover</button>
          </div>
          <button
            className="button is-link is-light is-outlined mark-as-complete"
            onClick={handleDeleteCard}
          >
            <span className="icon is-small">
              <i className="fas fa-check"></i>
            </span>
            <span>Mark as Complete</span>
          </button>
          <p className="is-size-4">Description</p>
          {descriptionComponent}
          {checklistsHeading}
          {checklists}
          <div className="members">
            <p className="is-size-4">Members</p>
            <div className={notificationClasses}>
              <button
                className="delete"
                onClick={handleCloseDuplicateMemberWarning}
              ></button>
              Member already added to card!
            </div>
            <MemberSelectionDropdown
              members={members}
              handleSelectMemberFromDropdown={handleSelectMemberFromDropdown}
              handleCardAttributeUpdate={handleCardAttributeUpdate}
            />
          </div>
          <div className="content membersList-container">
            <ul className="membersList">{membersList}</ul>
          </div>
          <div className="modal-card-footer">
            <p className="is-size-4">Activity</p>
            <div className="content">
              <ul>{cardActivity}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal
