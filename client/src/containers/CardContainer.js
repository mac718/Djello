import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../components/Card'
import { changeCardModalState } from '../actions'

class CardContainer extends Component {
  render() {
    const { title, cardModalState, handleCardModalState } = this.props
    console.log(cardModalState)
    return (
      <Card
        title={title}
        cardModalState={cardModalState}
        handleCardModalState={handleCardModalState}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    title: ownProps.title,
    cardModalState: state.cardModalState,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleCardModalState: e => {
      // let modal
      // state.cardModalState ? (modal = false) : (modal = true)
      // console.log(cardModalState)
      dispatch(changeCardModalState())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)
