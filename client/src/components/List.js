import React from 'react'
import Card from './Card'

const List = ({
  currentUser,
  id,
  deleteList,
  handleListNameChange,
  handleCreateCard,
}) => {
  let currentBoard = currentUser.boards.filter(board => {
    return board._id === currentUser.activeBoard
  })

  let currentList = currentBoard[0].lists.filter(list => {
    return id === list._id
  })
  let cardComponents
  let name = currentList[0].name
  let cards = currentList[0].cards
  if (cards) {
    cardComponents = cards.map(card => {
      return <Card content={card.content} key={card._id} />
    })
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
      <button className="button is-primary is-light" onClick={handleCreateCard}>
        Add Task
      </button>
      <button className="button is-danger is-light" onClick={deleteList}>
        Delete List
      </button>
    </div>
  )
}

export default List
