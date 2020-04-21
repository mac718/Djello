import React from 'react'
import ChecklistItemForm from './ChecklistItemForm'
import ChecklistTitleForm from './ChecklistTitleForm'
import CheclistTitleDisplay from './ChecklistTitleDisplay'
//import { showChecklistTitleForm } from '../actions'
import ChecklistTitleDisplay from './ChecklistTitleDisplay'

const Checklist = ({
  items,
  handleCheckItem,
  handleShowAddItemForm,
  handleHideAddItemForm,
  showChecklistItemForm,
  //handleCardAttributeEdit,
  handleAddChecklistItem,
  handleDisplayChecklistTitleForm,
  handleHideChecklistTitleForm,
  cardId,
  checklistId,
  title,
  showChecklistTitleForm,
  handleUpdateChecklistTitle,
  handleDeleteChecklist,
  handleEditChecklistItemForm,
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

  let progressValue =
    (checkedItemLength / items.length) * 100
      ? (checkedItemLength / items.length) * 100
      : 0

  console.log(checkedItemLength)

  let itemForm
  if (showChecklistItemForm === checklistId) {
    itemForm = (
      <ChecklistItemForm
        handleHideAddItemForm={handleHideAddItemForm}
        //handleCardAttributeEdit={handleCardAttributeEdit}
        handleAddChecklistItem={handleAddChecklistItem}
        handleEditChecklistItemForm={handleEditChecklistItemForm}
      />
    )
  } else {
    itemForm = (
      <button className="button is-light" onClick={handleShowAddItemForm}>
        Add an item
      </button>
    )
  }
  let checklistTitleComponent

  if (showChecklistTitleForm === checklistId) {
    checklistTitleComponent = (
      <ChecklistTitleForm
        title={title}
        //handleCardAttributeEdit={handleCardAttributeEdit}
        handleHideChecklistTitleForm={handleHideChecklistTitleForm}
        handleUpdateChecklistTitle={handleUpdateChecklistTitle}
      />
    )
  } else {
    checklistTitleComponent = (
      <ChecklistTitleDisplay
        title={title}
        handleDisplayChecklistTitleForm={handleDisplayChecklistTitleForm}
        showChecklistTitleForm={showChecklistTitleForm}
        handleDeleteChecklist={handleDeleteChecklist}
      />
    )
  }
  return (
    <div id={checklistId} className="checklist content">
      {checklistTitleComponent}
      <span>{progressValue}%</span>
      <progress
        class="progress is-primary is-small"
        value={progressValue}
        max="100"
      >
        {progressValue}%
      </progress>
      {listItems}

      {itemForm}
    </div>
  )
}

export default Checklist
