import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import {
  deleteList,
  changeName,
  createCardForm,
  saveCard,
  hideCardForm,
  changeTitle,
  showDeleteListWarningModal,
  closeDeleteListWarningModal,
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
      handleTitleChange,
      lists,
      showDeleteListWarningModal,
      handleShowDeleteListWarningModal,
      handleCloseDeleteListWarningModal,
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
        handleTitleChange={handleTitleChange}
        lists={lists}
        showDeleteListWarningModal={showDeleteListWarningModal}
        handleShowDeleteListWarningModal={handleShowDeleteListWarningModal}
        handleCloseDeleteListWarningModal={handleCloseDeleteListWarningModal}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    currentUser: state.currentUser,
    showCardForm: state.showCardForm,
    lists: state.activeBoardLists,
    showDeleteListWarningModal: state.showDeleteListWarningModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteList: listId => {
      dispatch(deleteList(listId))
      dispatch(closeDeleteListWarningModal())
    },

    handleListNameChange: e => {
      let componentName = e.target.value
      dispatch(changeName(e, componentName, '/changeListName'))
    },

    handleShowCardForm: e => {
      let listId = e.target.parentElement.id
      dispatch(createCardForm(listId))
    },

    handleHideCardForm: e => {
      dispatch(hideCardForm())
    },

    handleSaveCard: e => {
      dispatch(saveCard(e))
    },

    handleTitleChange: e => {
      let title = e.target.value
      console.log(title)
      dispatch(changeTitle(title))
    },

    handleShowDeleteListWarningModal: listId => {
      dispatch(showDeleteListWarningModal(listId))
    },

    handleCloseDeleteListWarningModal: () => {
      dispatch(closeDeleteListWarningModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
