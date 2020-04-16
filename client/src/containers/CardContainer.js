import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import {
  changeActiveCardModal,
  deleteCard,
  editCardAttribute,
  updateCardAttribute,
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
      handleCardAttributeUpdate,
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
        handleCardAttributeEdit={handleCardAttributeEdit}
        handleCardAttributeUpdate={handleCardAttributeUpdate}
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
    currentList: (currentList = state.activeBoardLists.filter(boardList => {
      return JSON.stringify(boardList._id) === JSON.stringify(ownProps.listId)
    })[0]),
    showChecklistItemForm: state.showChecklistItemForm,
    showChecklistTitleForm: state.showChecklistTitleForm,
    // currentCard: currentList.cards.filter(listCard => {
    //   return JSON.stringify(listCard._id) === JSON.stringify(ownProps.cardId)
    // })[0],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleActiveCardModal: e => {
      let id = e.target.parentElement.id
      dispatch(changeActiveCardModal(id))
      dispatch(getAllUsers())
    },

    handleDeleteCard: e => {
      let cardId =
        e.target.parentElement.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.id
      dispatch(deleteCard(cardId, listId))
      dispatch(changeActiveCardModal())
    },

    handleCardAttributeUpdate: e => {
      e.preventDefault()
      console.log(
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstChild.id,
      )
      dispatch(updateCardAttribute(e))
    },

    handleSwitchToCardDescriptionForm: () => {
      dispatch(switchToCardDescriptionForm())
    },

    handleSwitchToCardDescriptionDisplay: () => {
      dispatch(switchToCardDescriptionDisplay())
    },

    handleCardAttributeEdit: e => {
      let attribute = e.target.value
      dispatch(editCardAttribute(attribute))
    },

    handleSwitchToCardTitleForm: () => {
      dispatch(switchToCardDTitleForm())
    },

    handleSwitchToCardTitleDisplay: () => {
      dispatch(switchToCardTItleDisplay())
    },

    handleSelectMemberFromDropdown: e => {
      let member = e.target.innerHTML
      document.getElementById('dropdown-selection').innerHTML = member
      dispatch(selectMemberFromDropdown(member))
    },

    handleCloseDuplicateMemberWarning: () => {
      dispatch(closeDuplicateMemberWarning())
    },

    handleDeleteMemberFromCard: e => {
      dispatch(deleteMemberFromCard(e))
    },

    handleShowAddItemForm: e => {
      let checklistId = e.target.parentElement.id
      dispatch(showAddItemForm(checklistId))
    },

    handleHideAddItemForm: () => {
      dispatch(hideAddItemForm())
    },

    handleCreateChecklist: e => {
      dispatch(createChecklist(e))
    },

    handleAddChecklistItem: e => {
      e.preventDefault()
      dispatch(addChecklistItem(e))
      dispatch(hideAddItemForm())
    },

    handleCheckItem: e => {
      console.log(e.target.parentElement.id)
      dispatch(checkChecklistItem(e))
    },

    handleDisplayChecklistTitleForm: e => {
      console.log(e.target.parentElement.id)
      let checklistId = e.target.parentElement.id
      dispatch(displayChecklistTitleForm(checklistId))
    },

    handleHideChecklistTitleForm: e => {
      e.preventDefault()
      dispatch(HideChecklistTitleForm())
    },

    handleUpdateChecklistTitle: e => {
      e.preventDefault()
      dispatch(HideChecklistTitleForm())
      dispatch(updateChecklistTitle(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
