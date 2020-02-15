import React, { Component } from 'react'
import { connect } from 'react-redux'
import Show from '../components/Show'
import { handleLogOut } from '../actions'

class ShowContainer extends Component {
  render() {
    const { handleLogoutClick } = this.props
    return <Show handleLogoutClick={handleLogoutClick} />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogoutClick: e => {
      dispatch(handleLogOut(e))
    },
  }
}

export default connect(null, mapDispatchToProps)(ShowContainer)
