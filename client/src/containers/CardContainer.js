import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import {
  changeActiveCardModal,
  deleteCard,
  changeCardDescription,
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
      handleDescriptionChange,
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
        handleDescriptionChange={handleDescriptionChange}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleActiveCardModal: e => {
      let id = e.target.parentElement.id
      // let modal
      // state.ActiveCardModal ? (modal = false) : (modal = true)
      // console.log(ActiveCardModal)
      dispatch(changeActiveCardModal(id))
    },

    handleDeleteCard: e => {
      let cardId = e.target.parentElement.parentElement.parentElement.id
      let listId =
        e.target.parentElement.parentElement.parentElement.firstChild.id
      dispatch(deleteCard(cardId, listId))
    },

    handleDescriptionChange: e => {
      let description = e.target.value
      dispatch(changeCardDescription(description))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
