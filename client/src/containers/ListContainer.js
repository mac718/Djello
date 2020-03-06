import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import { deleteList, changeName, createCard } from '../actions'

class ListContainer extends Component {
  render() {
    const {
      id,
      deleteList,
      handleListNameChange,
      currentUser,
      handleCreateCard,
    } = this.props
    return (
      <List
        id={id}
        deleteList={deleteList}
        handleListNameChange={handleListNameChange}
        currentUser={currentUser}
        handleCreateCard={handleCreateCard}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
    currentUser: state.currentUser,
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

    handleCreateCard: e => {
      dispatch(createCard(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
