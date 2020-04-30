import React from 'react'
import CardDescriptionForm from './CardDescriptionForm'
import CardDescriptionDisplay from './CardDescriptionDisplay'
import CardTitleForm from './CardTitleForm'
import CardTitleDisplay from './CardTitleDisplay'
import Checklist from './Checklist'
import AttachmentForm from './AttachmentForm'

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
  handleToggleAddAttachmentDropdown,
  handleCloseAddAttachmentDropdown,
  showAddAttachmentDropdown,
  handleUploadFile,
  handleOpenAttachmentModal,
  showAttachmentModal,
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
          handleAddChecklistItem={handleAddChecklistItem}
          handleDisplayChecklistTitleForm={handleDisplayChecklistTitleForm}
          handleHideChecklistTitleForm={handleHideChecklistTitleForm}
          cardId={cardId}
          checklistId={checklist._id}
          handleCheckItem={handleCheckItem}
          title={checklist.title}
          showChecklistTitleForm={showChecklistTitleForm}
          handleUpdateChecklistTitle={handleUpdateChecklistTitle}
          handleDeleteChecklist={handleDeleteChecklist}
          handleEditChecklistItemForm={handleEditChecklistItemForm}
          handleEditChecklistTitleForm={handleEditChecklistTitleForm}
          key={checklist._id}
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

  if (members.length > 0) {
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

  let notificationClasses = showDuplicateMemberWarning
    ? 'notification is-danger is-light'
    : 'notification is-danger is-light hidden'

  let checklistsHeading
  checklistsHeading =
    currentCard.checklists.length > 0 ? (
      <p className="is-size-4">Checklists</p>
    ) : null

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
    <div className={deleteCardWarningModalClasses}>
      <div className="modal-background"></div>
      <div className="modal-content">
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
        className="modal-close is-large"
        aria-label="close"
        onClick={handleCloseDeleteCardWarningModal}
      ></button>
    </div>
  )

  let addAttachmentDropdownClasses

  if (showAddAttachmentDropdown === cardId) {
    addAttachmentDropdownClasses =
      'dropdown add-attachment-dropdown is-right is-active'
  } else {
    addAttachmentDropdownClasses = 'dropdown add-attachment-dropdown is-right'
  }

  let attachments = null
  if (currentCard.attachments) {
    attachments = currentCard.attachments.map((attachment) => {
      console.log(showAttachmentModal)
      let attachmentModalClasses
      if (showAttachmentModal === attachment) {
        attachmentModalClasses = 'modal is-active'
      } else {
        attachmentModalClasses = 'modal'
      }
      return (
        <div key={attachment} className="image-div" id={attachment}>
          <img
            className="attachment"
            src={attachment}
            onClick={handleOpenAttachmentModal}
            alt=""
          />
          <div className={attachmentModalClasses}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <p className="image">
                <img src={attachment} alt="" />
              </p>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={handleOpenAttachmentModal}
            ></button>
          </div>
        </div>
      )
    })
  }

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
                <i className="far fa-check-square"></i>
              </span>
              <span>Checklist</span>
            </button>
            <div className={memberDropdownClasses}>
              <div
                className="dropdown-trigger member-dropdown-trigger"
                onClick={handleOpenAddMemberDropdown}
              >
                <button
                  className="button is-fullwidth is-light"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu2"
                >
                  <span className="icon action-button-icon is-small">
                    <i className="fas fa-user-plus"></i>
                  </span>
                  <span>Member</span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content">{memberList}</div>
              </div>
            </div>
            <div className={addAttachmentDropdownClasses}>
              <div className="dropdown-trigger member-dropdown-trigger">
                <button
                  className="button is-fullwidth is-light"
                  aria-haspopup="true"
                  aria-controls="dropdown-menu3"
                  onClick={() => handleToggleAddAttachmentDropdown(cardId)}
                >
                  <span className="icon action-button-icon is-small">
                    <i className="fas fa-paperclip"></i>
                  </span>
                  <span>Attachment</span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                <div className="dropdown-content attachment-dropdown-content">
                  <AttachmentForm
                    handleUploadFile={handleUploadFile}
                    cardId={cardId}
                    listId={listId}
                  />
                </div>
              </div>
            </div>
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
          </div>
          <div className="content addedMembersList-container">
            <ul className="addedMembersList">{addedMembersList}</ul>
          </div>
          <div className="attachments">
            <p className="is-size-4">Attachments</p>
            <div className="attachment-images">{attachments}</div>
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
