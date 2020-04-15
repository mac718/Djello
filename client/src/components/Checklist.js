import React from 'react'
import ChecklistItemForm from './ChecklistItemForm'

const Checkist = ({
  items,
  handleCheckItem,
  handleShowAddItemForm,
  handleHideAddItemForm,
  showChecklistItemForm,
  handleCardAttributeEdit,
  handleAddChecklistItem,
  progressValue,
  cardId,
  checklistId,
}) => {
  let listItems = items.map(item => {
    let labelClasses = item.checked
      ? 'checklist-item-label checked'
      : 'checklist-item-label'
    return (
      <div className="checklistItem" id={item._id}>
        <input
          type="checkbox"
          value={item.content}
          name={item.content}
          onClick={handleCheckItem}
        />
        <label className={labelClasses} for={item.content}>
          {' '}
          {item.content}
        </label>
      </div>
    )
  })

  let checkedItemLength = items.filter(item => {
    return item.checked
  }).length

  console.log(checkedItemLength)

  let itemForm
  if (showChecklistItemForm === cardId) {
    itemForm = (
      <ChecklistItemForm
        handleHideAddItemForm={handleHideAddItemForm}
        handleCardAttributeEdit={handleCardAttributeEdit}
        handleAddChecklistItem={handleAddChecklistItem}
      />
    )
  } else {
    itemForm = (
      <button className="button is-light" onClick={handleShowAddItemForm}>
        Add an item
      </button>
    )
  }
  return (
    <div id={checklistId} className="checklist content">
      <span>{(checkedItemLength / items.length) * 100}%</span>
      <progress
        class="progress is-primary is-small"
        value={(checkedItemLength / items.length) * 100}
        max="100"
      >
        {(checkedItemLength / items.length) * 100}%
      </progress>
      {listItems}

      {itemForm}
    </div>
  )
}

export default Checkist
