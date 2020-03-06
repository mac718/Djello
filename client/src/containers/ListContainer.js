import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import {
  deleteList,
  changeName,
  createCardForm,
  saveCard,
  hideCardForm,
} from '../actions'

class ListContainer extends Component {
  render() {
    const {
      id,
      deleteList,
      handleListNameChange,
      currentUser,
      handleSaveCard,
      handleShowCardForm,
      handleHideCardForm,
      showCardForm,
    } = this.props
    return (
      <List
        id={id}
        deleteList={deleteList}
        handleListNameChange={handleListNameChange}
        currentUser={currentUser}
        handleSaveCard={handleSaveCard}
        handleShowCardForm={handleShowCardForm}
        handleHideCardForm={handleHideCardForm}
        showCardForm={showCardForm}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    currentUser: state.currentUser,
    showCardForm: state.showCardForm,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteList: e => {
      dispatch(deleteList(e))
    },

    handleListNameChange: e => {
      dispatch(changeName(e, '/changeListName'))
    },

    handleShowCardForm: () => {
      dispatch(createCardForm())
    },

    handleHideCardForm: () => {
      dispatch(hideCardForm())
    },

    handleSaveCard: e => {
      dispatch(saveCard(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
