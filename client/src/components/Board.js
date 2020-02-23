import React from 'react'
import List from './List'

const Board = ({ handleClick, name, lists }) => {
  console.log('name ' + lists)
  let boardLists = 'hello'
  if (lists) {
    boardLists = lists.map(list => {
      return <List name={list.name} cards={list.cards} key={list._id} />
    })
  }
  return (
    <div className="board">
      <div className="is-size-4">{name}</div>
      {boardLists}
      <button
        className="button add-list is-light is-medium"
        onClick={handleClick}
      >
        Add A List...
      </button>
    </div>
  )
}

export default Board
