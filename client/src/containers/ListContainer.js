import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import { deleteList } from '../actions'

class ListContainer extends Component {
  render() {
    const { id, deleteList } = this.props
    return <List id={id} deleteList={deleteList} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
