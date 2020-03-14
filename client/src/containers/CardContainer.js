import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import { changeActiveCardModal } from '../actions'

class CardContainer extends Component {
  render() {
    const { title, activeCardModal, handleActiveCardModal, id } = this.props
    console.log(activeCardModal)
    return (
      <Card
        title={title}
        activeCardModal={activeCardModal}
        handleActiveCardModal={handleActiveCardModal}
        id={id}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
    id: ownProps.id,
    activeCardModal: state.activeCardModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleActiveCardModal: e => {
      let id = e.target.parentElement.id
      // let modal
      // state.ActiveCardModal ? (modal = false) : (modal = true)
      // console.log(ActiveCardModal)
      dispatch(changeActiveCardModal(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
