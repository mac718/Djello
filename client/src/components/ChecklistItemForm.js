import React from 'react'

const ChecklistItemForm = ({
  handleEditChecklistItemForm,
  handleHideAddItemForm,
  handleAddChecklistItem,
}) => {
  return (
    <form className="checklist-item-form" onSubmit={handleAddChecklistItem}>
      <div>
        <a
          className="hide-add-item-form delete is-medium"
          onClick={handleHideAddItemForm}
        ></a>
        <input
          className="input"
          type="text"
          onChange={handleEditChecklistItemForm}
        />
      </div>
      <button className="button" type="submit">
        Add
      </button>
    </form>
  )
}

export default ChecklistItemForm
