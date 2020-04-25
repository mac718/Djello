import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import {
  changeActiveCardModal,
  deleteCard,
  editCardTitle,
  updateCardTitle,
  editCardDescription,
  updateCardDescription,
  addMemberToCard,
  switchToCardDescriptionForm,
  switchToCardDescriptionDisplay,
  switchToCardDTitleForm,
  switchToCardTItleDisplay,
  getAllUsers,
  selectMemberFromDropdown,
  closeDuplicateMemberWarning,
  deleteMemberFromCard,
  setCurrentListAndCard,
  showAddItemForm,
  hideAddItemForm,
  createChecklist,
  addChecklistItem,
  checkChecklistItem,
  HideChecklistTitleForm,
  displayChecklistTitleForm,
  updateChecklistTitle,
  deleteChecklist,
  openMemberDropdown,
  activateMemberListDropdown,
  editChecklistItemForm,
  showDeleteCardWarningModal,
  closeDeleteCardWarningModal,
  editChecklistTitleForm,
  toggleAddAttachmentDropdown,
  closeAddAttachmentDropdown,
  uploadFile,
} from '../actions'

class CardContainer extends Component {
  render() {
    const {
      currentUser,
      attributeContent,
      activeCardModal,
      handleActiveCardModal,
      cardId,
      handleDeleteCard,
      listId,
      listName,
      handleCardAttributeEdit,
      handleUpdateCardTitle,
      handleUpdateCardDescription,
      handleAddMemberToCard,
      handleSwitchToCardDescriptionForm,
      handleSwitchToCardDescriptionDisplay,
      showCardDescriptionForm,
      handleSwitchToCardTitleForm,
      handleSwitchToCardTitleDisplay,
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
      ShowMemberListDropdown,
      handleEditCardTitle,
      handleEditCardDescription,
      handleEditChecklistItemForm,
      handleShowDeleteCardWarningModal,
      handleCloseDeleteCardWarningModal,
      showDeleteCardWarningModal,
      handleEditChecklistTitleForm,
      handleToggleAddAttachmentDropdown,
      handleCloseAddAttachmentDropdown,
      showAddAttachmentDropdown,
      handleUploadFile,
    } = this.props
    console.log(activeCardModal)
    return (
      <Card
        currentUser={currentUser}
        attributeContent={attributeContent}
        activeCardModal={activeCardModal}
        handleActiveCardModal={handleActiveCardModal}
        cardId={cardId}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
        listName={listName}
        handleEditCardTitle={handleEditCardTitle}
        handleEditCardDescription={handleEditCardDescription}
        handleUpdateCardTitle={handleUpdateCardTitle}
        handleUpdateCardDescription={handleUpdateCardDescription}
        handleAddMemberToCard={handleAddMemberToCard}
        handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
        handleSwitchToCardDescriptionDisplay={
          handleSwitchToCardDescriptionDisplay
        }
        handleSwitchToCardTitleForm={handleSwitchToCardTitleForm}
        handleSwitchToCardTitleDisplay={handleSwitchToCardTitleDisplay}
        showCardDescriptionForm={showCardDescriptionForm}
        showCardTitleForm={showCardTitleForm}
        isLoading={isLoading}
        title={title}
        userList={userList}
        handleSelectMemberFromDropdown={handleSelectMemberFromDropdown}
        showDuplicateMemberWarning={showDuplicateMemberWarning}
        handleCloseDuplicateMemberWarning={handleCloseDuplicateMemberWarning}
        handleDeleteMemberFromCard={handleDeleteMemberFromCard}
        index={index}
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
        ShowMemberListDropdown={ShowMemberListDropdown}
        handleEditChecklistItemForm={handleEditChecklistItemForm}
        handleShowDeleteCardWarningModal={handleShowDeleteCardWarningModal}
        handleCloseDeleteCardWarningModal={handleCloseDeleteCardWarningModal}
        showDeleteCardWarningModal={showDeleteCardWarningModal}
        handleEditChecklistTitleForm={handleEditChecklistTitleForm}
        handleToggleAddAttachmentDropdown={handleToggleAddAttachmentDropdown}
        handleCloseAddAttachmentDropdown={handleCloseAddAttachmentDropdown}
        showAddAttachmentDropdown={showAddAttachmentDropdown}
        handleUploadFile={handleUploadFile}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let currentList
  // let currentCard
  return {
    currentUser: state.currentUser,
    title: ownProps.title,
    cardId: ownProps.cardId,
    activeCardModal: state.activeCardModal,
    listId: ownProps.listId,
    listName: ownProps.listName,
    showCardDescriptionForm: state.showCardDescriptionForm,
    showCardTitleForm: state.showCardTitleForm,
    attributeContent: state.attributeContent,
    isLoading: state.isLoading,
    userList: state.userList,
    showDuplicateMemberWarning: state.showDuplicateMemberWarning,
    index: ownProps.index,
    lists: state.activeBoardLists,
    currentList: (currentList = state.activeBoardLists.filter((boardList) => {
      return JSON.stringify(boardList._id) === JSON.stringify(ownProps.listId)
    })[0]),
    showChecklistItemForm: state.showChecklistItemForm,
    showChecklistTitleForm: state.showChecklistTitleForm,
    showAddMemberDropdown: state.showAddMemberDropdown,
    showMemberListDropdown: state.showMemberListDropdown,
    showDeleteCardWarningModal: state.showDeleteCardWarningModal,
    showAddAttachmentDropdown: state.showAddAttachmentDropdown,
    // currentCard: currentList.cards.filter(listCard => {
    //   return JSON.stringify(listCard._id) === JSON.stringify(ownProps.cardId)
    // })[0],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleActiveCardModal: (e) => {
      let id = e.target.parentElement.id
      dispatch(changeActiveCardModal(id))
      dispatch(getAllUsers())
    },

    handleDeleteCard: (cardId, listId) => {
      // let cardId =
      //   e.target.parentElement.parentElement.parentElement.parentElement.id
      // let listId =
      //   e.target.parentElement.parentElement.parentElement.parentElement
      //     .firstChild.id
      dispatch(deleteCard(cardId, listId))
      dispatch(changeActiveCardModal())
    },

    handleUpdateCardTitle: (e) => {
      e.preventDefault()
      let cardId =
        e.target.parentElement.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.id
      dispatch(updateCardTitle(e, listId, cardId))
    },

    handleUpdateCardDescription: (e) => {
      e.preventDefault()
      dispatch(updateCardDescription(e))
    },

    handleAddMemberToCard: (e) => {
      e.preventDefault()
      dispatch(addMemberToCard(e))
    },

    handleSwitchToCardDescriptionForm: () => {
      dispatch(switchToCardDescriptionForm())
    },

    handleSwitchToCardDescriptionDisplay: () => {
      dispatch(switchToCardDescriptionDisplay())
    },

    handleEditCardTitle: (e) => {
      let title = e.target.value
      dispatch(editCardTitle(title))
    },

    handleEditCardDescription: (e) => {
      let description = e.target.value
      dispatch(editCardDescription(description))
    },

    handleSwitchToCardTitleForm: () => {
      dispatch(switchToCardDTitleForm())
    },

    handleSwitchToCardTitleDisplay: () => {
      dispatch(switchToCardTItleDisplay())
    },

    handleSelectMemberFromDropdown: (e) => {
      let member = e.target.innerHTML
      //document.getElementById('dropdown-selection').innerHTML = member
      dispatch(selectMemberFromDropdown(member))
      dispatch(addMemberToCard(e))
    },

    handleCloseDuplicateMemberWarning: () => {
      dispatch(closeDuplicateMemberWarning())
    },

    handleDeleteMemberFromCard: (e) => {
      dispatch(deleteMemberFromCard(e))
    },

    handleShowAddItemForm: (e) => {
      let checklistId = e.target.parentElement.id
      dispatch(showAddItemForm(checklistId))
    },

    handleHideAddItemForm: () => {
      dispatch(hideAddItemForm())
    },

    handleCreateChecklist: (cardId, listId) => {
      // console.log(
      //   e.target.parentElement.parentElement.parentElement.parentElement.id,
      // )
      // let cardId =
      //   e.target.parentElement.parentElement.parentElement.parentElement.id
      // let listId =
      //   e.target.parentElement.parentElement.parentElement.parentElement
      //     .firstChild.id
      dispatch(createChecklist(cardId, listId))
    },

    handleAddChecklistItem: (e) => {
      e.preventDefault()
      dispatch(addChecklistItem(e))
      dispatch(hideAddItemForm())
    },

    handleCheckItem: (e) => {
      console.log(e.target.parentElement.id)
      dispatch(checkChecklistItem(e))
    },

    handleDisplayChecklistTitleForm: (e) => {
      console.log(e.target.parentElement.id)
      let checklistId = e.target.parentElement.id
      dispatch(displayChecklistTitleForm(checklistId))
    },

    handleHideChecklistTitleForm: (e) => {
      e.preventDefault()
      dispatch(HideChecklistTitleForm())
    },

    handleUpdateChecklistTitle: (e) => {
      e.preventDefault()
      dispatch(HideChecklistTitleForm())
      dispatch(updateChecklistTitle(e))
    },

    handleDeleteChecklist: (e) => {
      e.preventDefault()
      console.log(e.target.parentElement.parentElement.parentElement.id)
      dispatch(deleteChecklist(e))
    },

    handleOpenAddMemberDropdown: () => {
      dispatch(openMemberDropdown())
    },

    handleActivateMemberListDropdown: () => {
      dispatch(activateMemberListDropdown())
    },

    handleEditChecklistItemForm: (e) => {
      let item = e.target.value
      dispatch(editChecklistItemForm(item))
    },

    handleEditChecklistTitleForm: (e) => {
      let checklistTitle = e.target.value
      dispatch(editChecklistTitleForm(checklistTitle))
    },

    handleShowDeleteCardWarningModal: (cardId) => {
      dispatch(showDeleteCardWarningModal(cardId))
    },

    handleCloseDeleteCardWarningModal: (e) => {
      e.preventDefault()
      dispatch(closeDeleteCardWarningModal())
    },

    handleToggleAddAttachmentDropdown: (cardId) => {
      dispatch(toggleAddAttachmentDropdown(cardId))
    },

    handleCloseAddAttachmentDropdown: () => {
      dispatch(closeAddAttachmentDropdown)
    },

    handleUploadFile: (e) => {
      e.preventDefault()

      const files = e.target.files

      dispatch(uploadFile(files))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
