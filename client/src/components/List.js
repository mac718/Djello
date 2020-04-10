import React from 'react'
import CardContainer from '../containers/CardContainer'
import CardForm from './CardForm'
import { Droppable } from 'react-beautiful-dnd'

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
  lists,
}) => {
  let currentBoard = currentUser.boards.filter(board => {
    return board._id === currentUser.activeBoard
  })

  console.log(currentBoard)
  console.log('list lists ' + JSON.stringify(lists))

  let currentList = lists.filter(list => {
    return id === list._id
  })

  console.log(currentList)
  let cardComponents
  let cardForm
  let name = currentList[0].name
  let cards = currentList[0].cards

  if (cards) {
    cardComponents = cards.map((card, index) => {
      return (
        <CardContainer
          title={card.title}
          cardId={card._id}
          listId={id}
          listName={currentList[0].name}
          key={card._id}
          index={index}
        />
      )
    })
  }

  if (showCardForm === id) {
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
    <div id={id} className="list tile is-2 is-vertical is-parent notification">
      <a className="delete-list delete is-medium" onClick={deleteList}></a>
      <div className="list-name is-size-5">
        <input
          id="list-name"
          className="input"
          type="text"
          placeholder="Enter List Name"
          defaultValue={name}
          onBlur={handleListNameChange}
        />
      </div>
      <Droppable droppableId={id}>
        {provided => (
          <div
            provided={provided}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cardComponents}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {cardForm}
      <button
        className="button is-primary is-light"
        onClick={handleShowCardForm}
      >
        + Add Card
      </button>
    </div>
  )
}

export default List
