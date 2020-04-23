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
  showDeleteListWarningModal,
  handleShowDeleteListWarningModal,
  handleCloseDeleteListWarningModal,
}) => {
  let currentBoard = currentUser.boards.filter((board) => {
    return board._id === currentUser.activeBoard
  })

  console.log(currentBoard)
  console.log('list lists ' + JSON.stringify(lists))
  console.log(id)

  let currentList = lists.filter((list) => {
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

  let deleteListWarningModalClasses
  if (showDeleteListWarningModal === id) {
    console.log(id)
    deleteListWarningModalClasses = 'modal delete-warning is-active'
  } else {
    deleteListWarningModalClasses = 'modal delete-warning'
  }

  let deleteListWarningModal = (
    <div class={deleteListWarningModalClasses}>
      <div class="modal-background"></div>
      <div class="modal-content">
        <div className="box">
          <p className="delete-warning-message">
            This action will permantly delete this list. Are you sure you want
            to proceed?
          </p>
          <div className="field is-grouped delete-warning-buttons">
            <div className="control">
              <button
                className="button is-primary is-light is-outlined"
                onClick={() => deleteList(id)}
              >
                Yes, delete the list {id}
              </button>
            </div>
            <div className="control">
              <button
                className="button is-danger is-light is-outlined"
                onClick={handleCloseDeleteListWarningModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        class="modal-close is-large"
        aria-label="close"
        onClick={handleCloseDeleteListWarningModal}
      ></button>
    </div>
  )

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
          <a
            className="delete-list delete is-medium"
            onClick={() => handleShowDeleteListWarningModal(id)}
          ></a>
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
          {deleteListWarningModal}
        </div>
      )}
    </Droppable>
  )
}

export default List
