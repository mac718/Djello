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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteList: e => {
      dispatch(deleteList(e))
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
