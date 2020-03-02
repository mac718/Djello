import React from 'react'
import List from './List'
import ListContainer from '../containers/ListContainer'

const Board = ({ handleClick, name, lists }) => {
  console.log('name ' + lists)
  let boardLists = 'hello'
  if (lists) {
    boardLists = lists.map(list => {
      return (
        <ListContainer id={list._id} key={list._id} />
        // <List
        //   name={list.name}
        //   cards={list.cards}
        //   id={list._id}
        //   key={list._id}
        // />
      )
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
