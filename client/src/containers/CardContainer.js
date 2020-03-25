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
} from '../actions'

class CardContainer extends Component {
  render() {
    const {
      currentUser,
      title,
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
      showCardTitleForm,
    } = this.props
    console.log(activeCardModal)
    return (
      <Card
        currentUser={currentUser}
        title={title}
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
        showCardDescriptionForm={showCardDescriptionForm}
        showCardTitleForm={showCardTitleForm}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleActiveCardModal: e => {
      let id = e.target.parentElement.id
      dispatch(changeActiveCardModal(id))
    },

    handleDeleteCard: e => {
      let cardId = e.target.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.firstChild.id
      dispatch(deleteCard(cardId, listId))
      dispatch(changeActiveCardModal())
    },

    // handleCardDescriptionEdit: e => {
    //   let description = e.target.value
    //   dispatch(editCardDescription(description))
    // },

    handleCardAttributeUpdate: e => {
      e.preventDefault()
      let cardId = e.target.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.firstChild.id
      console.log(e.target.parentElement.parentElement.parentElement.id)
      dispatch(updateCardAttribute(listId, cardId))
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
