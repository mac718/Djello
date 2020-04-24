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
  handleOpenAddMemberDropdown,
  showAddMemberDropdown,
  handleActivateMemberListDropdown,
  showMemberListDropdown,
  handleEditChecklistItemForm,
  handleShowDeleteCardWarningModal,
  handleCloseDeleteCardWarningModal,
  showDeleteCardWarningModal,
  handleEditChecklistTitleForm,
}) => {
  console.log('listId ' + listId)
  console.log('carId ' + cardId)
  let currentBoard = currentUser.boards.filter((board) => {
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
  let addedMembersList
  let checklists
  let memberList

  console.log(currentList)

  // currentCard = currentList.cards.filter(listCard => {
  //   return JSON.stringify(listCard._id) === JSON.stringify(cardId)
  // })[0]

  if (currentCard.activity) {
    cardActivity = currentCard.activity.map((action) => {
      return <li key={action}>{action}</li>
    })
  }

  if (currentCard.checklists) {
    checklists = currentCard.checklists.map((checklist) => {
      return (
        <Checklist
          items={checklist.items}
          handleShowAddItemForm={handleShowAddItemForm}
          handleHideAddItemForm={handleHideAddItemForm}
          showChecklistItemForm={showChecklistItemForm}
          //handleCardAttributeEdit={handleCardAttributeEdit}
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
          handleEditChecklistItemForm={handleEditChecklistItemForm}
          handleEditChecklistTitleForm={handleEditChecklistTitleForm}
        />
      )
    })
  }
  descriptionForm = (
    <CardDescriptionForm
      description={currentCard.description}
      handleEditCardDescription={handleEditCardDescription}
      handleUpdateCardDescription={handleUpdateCardDescription}
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
      handleEditCardTitle={handleEditCardTitle}
      handleUpdateCardTitle={handleUpdateCardTitle}
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

  addedMembersList = currentCard.members.map((member) => {
    return (
      <li className="member" key={member}>
        <div className="member-username">{member}</div>
        <a className="remove-link" onClick={handleDeleteMemberFromCard}>
          remove
        </a>
      </li>
    )
  })

  if (members) {
    memberList = members.map((member) => {
      return (
        <a
          href="#"
          className="dropdown-item"
          onClick={handleSelectMemberFromDropdown}
          key={member._id}
        >
          {member.username}
        </a>
      )
    })
  }
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

  let memberDropdown

  console.log(showAddMemberDropdown)

  let memberDropdownClasses = showAddMemberDropdown
    ? 'dropdown member-dropdown is-right is-active'
    : 'dropdown member-dropdown is-right'

  console.log(showDeleteCardWarningModal)

  let deleteCardWarningModalClasses
  if (showDeleteCardWarningModal === cardId) {
    console.log('hallo!!')
    deleteCardWarningModalClasses = 'modal delete-warning is-active'
  } else {
    deleteCardWarningModalClasses = 'modal delete-warning'
  }

  let deleteCardWarningModal = (
    <div class={deleteCardWarningModalClasses}>
      <div class="modal-background"></div>
      <div class="modal-content">
        <div className="box">
          <p className="delete-warning-message">
            This action will permantly delete this card. Are you sure you want
            to proceed?
          </p>
          <div className="field is-grouped delete-warning-buttons">
            <div className="control">
              <button
                className="button is-primary is-light"
                onClick={() => handleDeleteCard(cardId, listId)}
              >
                Yep, I'm done with this card!
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light"
                onClick={handleCloseDeleteCardWarningModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={handleCloseDeleteCardWarningModal}
      ></button>
    </div>
  )

  return (
    <div id={cardId} className={classes}>
      <span id={listId}></span>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <div className="modal-card-title">
            {titleComponent}
            <p className="in-list is-size-6">In list {listName}</p>
          </div>

          <button
            className="delete"
            aria-label="close"
            onClick={handleActiveCardModal}
          ></button>
        </div>

        <div className="modal-card-body">
          <div className="actions">
            <p className="is-size-4">Add</p>
            <button
              className="button is-fullwidth is-light"
              onClick={() => handleCreateChecklist(cardId, listId)}
            >
              <span className="icon action-button-icon is-small">
                <i class="far fa-check-square"></i>
              </span>
              <span>Checklist</span>
            </button>
            <div class={memberDropdownClasses}>
              <div
                class="dropdown-trigger member-dropdown-trigger"
                onClick={handleOpenAddMemberDropdown}
              >
                <button
                  className="button is-fullwidth is-light"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu2"
                >
                  <span className="icon action-button-icon is-small">
                    <i class="fas fa-user-plus"></i>
                  </span>
                  <span>Member</span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                <div class="dropdown-content">
                  {memberList}
                  {/* <div class="dropdown-item"> */}
                  {/* <MemberSelectionDropdown
                    members={members}
                    handleSelectMemberFromDropdown={
                      handleSelectMemberFromDropdown
                    }
                    handleCardAttributeUpdate={handleCardAttributeUpdate}
                    handleActivateMemberListDropdown={
                      handleActivateMemberListDropdown
                    }
                    showMemberListDropdown={showMemberListDropdown}
                  /> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <button className="button is-fullwidth is-light">
              <span className="icon action-button-icon is-small">
                <i class="fas fa-paperclip"></i>
              </span>
              <span>Attachment</span>
            </button>
          </div>
          <button
            className="button is-link is-light is-outlined mark-as-complete"
            onClick={() => handleShowDeleteCardWarningModal(cardId)}
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
            {/* <MemberSelectionDropdown
              members={members}
              handleSelectMemberFromDropdown={handleSelectMemberFromDropdown}
              handleCardAttributeUpdate={handleCardAttributeUpdate}
            /> */}
          </div>
          <div className="content addedMembersList-container">
            <ul className="addedMembersList">{addedMembersList}</ul>
          </div>
          <div className="modal-card-footer">
            <p className="is-size-4">Activity</p>
            <div className="content">
              <ul>{cardActivity}</ul>
            </div>
          </div>
        </div>
      </div>
      {deleteCardWarningModal}
    </div>
  )
}

export default CardModal
