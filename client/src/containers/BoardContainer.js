import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { createList } from '../actions'

class BoardContainer extends Component {
  render() {
    const { handleClick, currentUser } = this.props
    let name = currentUser.activeBoard.name
    let lists = currentUser.activeBoard.lists
    return <Board handleClick={handleClick} name={name} lists={lists} />
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleClick: e => {
      dispatch(createList(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)
