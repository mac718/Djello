import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import { changeActiveCardModal, deleteCard } from '../actions'

class CardContainer extends Component {
  render() {
    const {
      title,
      activeCardModal,
      handleActiveCardModal,
      id,
      handleDeleteCard,
      listId,
    } = this.props
    console.log(activeCardModal)
    return (
      <Card
        title={title}
        activeCardModal={activeCardModal}
        handleActiveCardModal={handleActiveCardModal}
        id={id}
        handleDeleteCard={handleDeleteCard}
        listId={listId}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
    id: ownProps.id,
    activeCardModal: state.activeCardModal,
    listId: ownProps.listId,
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
