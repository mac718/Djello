import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import { deleteList, changeName } from '../actions'

class ListContainer extends Component {
  render() {
    const { id, deleteList, handleListNameChange } = this.props
    return (
      <List
        id={id}
        deleteList={deleteList}
        handleListNameChange={handleListNameChange}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    id: ownProps.id,
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
