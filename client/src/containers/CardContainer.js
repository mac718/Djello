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
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
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
      let cardId = e.target.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.firstChild.id
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
