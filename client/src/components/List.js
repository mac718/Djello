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
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          provided={provided}
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={
            snapshot.isDraggingOver
              ? 'list tile is-2 is-vertical is-parent notification is-dragging-over'
              : 'list tile is-2 is-vertical is-parent notification is-light'
          }
        >
          <a className="delete-list delete is-medium" onClick={deleteList}></a>
          <div id={id}>
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

            {cardComponents}
            {provided.placeholder}

            {cardForm}
            <button
              className="button is-primary is-light is-fullwidth"
              onClick={handleShowCardForm}
            >
              + Add Card
            </button>
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default List
