import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import { deleteList, changeName } from '../actions'

class ListContainer extends Component {
  render() {
    const { id, deleteList, handleListNameChange, currentUser } = this.props
    return (
      <List
        id={id}
        deleteList={deleteList}
        handleListNameChange={handleListNameChange}
        currentUser={currentUser}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
