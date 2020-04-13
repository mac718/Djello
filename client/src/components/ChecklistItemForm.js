import React from 'react'

const ChecklistItemForm = ({
  handleCardAttributeUpdate,
  handleCardAttributeEdit,
  handleHideAddItemForm,
}) => {
  return (
    <form className="checklist-item-form" onSubmit={handleCardAttributeUpdate}>
      <div>
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
    </form>
  )
}

export default ChecklistItemForm
