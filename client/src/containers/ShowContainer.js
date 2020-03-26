import React, { Component } from 'react'
import { connect } from 'react-redux'
import Show from '../components/Show'
import {
  handleLogOut,
  createBoard,
  deleteBoard,
  switchActiveBoard,
  redirectAfterLogout,
} from '../actions'

class ShowContainer extends Component {
  render() {
    const {
      handleLogoutClick,
      handleCreateBoard,
      currentUser,
      handleDeleteBoard,
      handleActiveBoardSwitch,
      redirect,
    } = this.props
    return (
      <Show
        handleLogoutClick={handleLogoutClick}
        handleCreateBoard={handleCreateBoard}
        handleDeleteBoard={handleDeleteBoard}
        currentUser={currentUser}
        handleActiveBoardSwitch={handleActiveBoardSwitch}
        redirect={redirect}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    redirect: state.redirect,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleLogoutClick: e => {
      dispatch(handleLogOut(e))
    },

    handleCreateBoard: e => {
      dispatch(createBoard(e))
    },

    handleDeleteBoard: e => {
      dispatch(deleteBoard(e))
    },

    handleActiveBoardSwitch: e => {
      dispatch(switchActiveBoard(e))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)
