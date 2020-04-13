import React from 'react'
import ChecklistItemForm from './ChecklistItemForm'

const Checkist = ({
  items,
  handleToggleCheck,
  handleShowAddItemForm,
  handleHideAddItemForm,
  showChecklistItemForm,
  progressValue,
  cardId,
}) => {
  let listItems = items.map(item => {
    return (
      <div>
        <input
          type="checkbox"
          value={item}
          name={item}
          onClick={handleToggleCheck}
        />
        <label for={item}> {item}</label>
      </div>
    )
  })

  let itemForm
  if (showChecklistItemForm === cardId) {
    itemForm = (
      <ChecklistItemForm handleHideAddItemForm={handleHideAddItemForm} />
    )
  } else {
    itemForm = null
  }
  return (
    <div className="checklist content">
      <span>15%</span>
      <progress class="progress is-primary" value="15" max="100">
        15%
      </progress>
      {listItems}
      <button className="button is-light" onClick={handleShowAddItemForm}>
        Add an item
      </button>
      {itemForm}
    </div>
  )
}

export default Checkist
