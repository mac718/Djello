import React from 'react'

const ChecklistItemForm = ({
  handleCardAttributeUpdate,
  handleCardAttributeEdit,
  handleHideAddItemForm,
}) => {
  return (
    <div className="checklist-item-form" onSubmit={handleCardAttributeUpdate}>
      <div className="control">
        <a
          className="hide-add-item-form delete is-medium"
          onClick={handleHideAddItemForm}
        ></a>
        <input
          className="input"
          type="text"
          onChange={handleCardAttributeEdit}
        />
      </div>
      <button className="button" type="submit">
        Add
      </button>
    </div>
  )
}

export default ChecklistItemForm
