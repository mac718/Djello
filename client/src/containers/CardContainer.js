import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import {
  changeActiveCardModal,
  deleteCard,
  editCardDescription,
  updateCardDescription,
  switchToCardDescriptionForm,
  switchToCardDescriptionDisplay,
} from '../actions'

class CardContainer extends Component {
  render() {
    const {
      title,
      activeCardModal,
      handleActiveCardModal,
      cardId,
      handleDeleteCard,
      listId,
      listName,
      handleCardDescriptionEdit,
      handleCardDescriptionUpdate,
      handleSwitchToCardDescriptionForm,
      handleSwitchToCardDescriptionDisplay,
      showCardDescriptionForm,
    } = this.props
    console.log(activeCardModal)
    return (
      <Card
        title={title}
        activeCardModal={activeCardModal}
        handleActiveCardModal={handleActiveCardModal}
        cardId={cardId}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
        listName={listName}
        handleCardDescriptionEdit={handleCardDescriptionEdit}
        handleCardDescriptionUpdate={handleCardDescriptionUpdate}
        handleSwitchToCardDescriptionForm={handleSwitchToCardDescriptionForm}
        handleSwitchToCardDescriptionDisplay={
          handleSwitchToCardDescriptionDisplay
        }
        showCardDescriptionForm={showCardDescriptionForm}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
    cardId: ownProps.cardId,
    activeCardModal: state.activeCardModal,
    listId: ownProps.listId,
    listName: ownProps.listName,
    showCardDescriptionForm: state.showCardDescriptionForm,
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

    handleCardDescriptionEdit: e => {
      let description = e.target.value
      dispatch(editCardDescription(description))
    },

    handleCardDescriptionUpdate: e => {
      e.preventDefault()
      let cardId = e.target.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.firstChild.id
      console.log(e.target.parentElement.parentElement.parentElement.id)
      dispatch(updateCardDescription(listId, cardId))
    },

    handleSwitchToCardDescriptionForm: () => {
      dispatch(switchToCardDescriptionForm())
    },

    handleSwitchToCardDescriptionDisplay: () => {
      dispatch(switchToCardDescriptionDisplay())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
