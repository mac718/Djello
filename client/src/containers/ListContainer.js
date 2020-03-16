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

    handleHideCardForm: e => {
      dispatch(hideCardForm())
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
