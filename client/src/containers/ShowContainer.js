import React, { Component } from 'react'
import { connect } from 'react-redux'
import Show from '../components/Show'
import {
  handleLogOut,
  createBoard,
  deleteBoard,
  switchActiveBoard,
  redirectAfterLogout,
  showDeleteBoardWarningModal,
  closeDeleteBoardWarningModal,
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
      handleShowDeleteBoardWarningModal,
      handleCloseDeleteBoardWarningModal,
      showDeleteBoardWarningModal,
    } = this.props
    return (
      <Show
        handleLogoutClick={handleLogoutClick}
        handleCreateBoard={handleCreateBoard}
        handleDeleteBoard={handleDeleteBoard}
        currentUser={currentUser}
        handleActiveBoardSwitch={handleActiveBoardSwitch}
        redirect={redirect}
        handleShowDeleteBoardWarningModal={handleShowDeleteBoardWarningModal}
        handleCloseDeleteBoardWarningModal={handleCloseDeleteBoardWarningModal}
        showDeleteBoardWarningModal={showDeleteBoardWarningModal}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    redirect: state.redirect,
    showDeleteBoardWarningModal: state.showDeleteBoardWarningModal,
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

    handleDeleteBoard: boardId => {
      dispatch(deleteBoard(boardId))
      dispatch(closeDeleteBoardWarningModal())
    },

    handleActiveBoardSwitch: e => {
      dispatch(switchActiveBoard(e))
    },

    handleShowDeleteBoardWarningModal: boardId => {
      dispatch(showDeleteBoardWarningModal(boardId))
    },

    handleCloseDeleteBoardWarningModal: () => {
      dispatch(closeDeleteBoardWarningModal())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowContainer)
