import React from 'react'
import CardContainer from '../containers/CardContainer'
import CardForm from './CardForm'

const List = ({
  currentUser,
  id,
  deleteList,
  handleListNameChange,
  handleSaveCard,
  handleShowCardForm,
  handleHideCardForm,
  showCardForm,
  handleTitleChange,
}) => {
  let currentBoard = currentUser.boards.filter(board => {
    return board._id === currentUser.activeBoard
  })

  console.log(currentBoard)

  let currentList = currentBoard[0].lists.filter(list => {
    return id === list._id
  })

  console.log(currentList)
  let cardComponents
  let cardForm
  let name = currentList[0].name
  let cards = currentList[0].cards
  if (cards) {
    cardComponents = cards.map(card => {
      return <CardContainer title={card.title} id={card._id} key={card._id} />
    })
  }

  if (showCardForm) {
    cardForm = (
      <CardForm
        handleSaveCard={handleSaveCard}
        handleHideCardForm={handleHideCardForm}
        handleTitleChange={handleTitleChange}
      />
    )
  } else {
    cardForm = null
  }

  return (
    <div
      id={id}
      className="list tile is-2 is-vertical is-parent notification is-secondary"
    >
      <div className="list-name is-size-5">
        <input
          id="board-name"
          className="input"
          type="text"
          placeholder="Enter List Name"
          defaultValue={name}
          onBlur={handleListNameChange}
        />
      </div>
      {cardComponents}
      {cardForm}
      <button
        className="button is-primary is-light"
        onClick={handleShowCardForm}
      >
        Add Task
      </button>
      <button className="button is-danger is-light" onClick={deleteList}>
        Delete List
      </button>
    </div>
  )
}

export default List
