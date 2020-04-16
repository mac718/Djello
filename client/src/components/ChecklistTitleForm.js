import React from 'react'

const ChecklistTitleForm = ({
  title,
  handleCardAttributeEdit,
  handleChecklistTitleUpdate,
  handleHideChecklistTitleForm,
  checklistId,
  listId,
  cardId,
}) => {
  return (
    <form onSubmit={handleChecklistTitleUpdate}>
      <input
        className="input"
        type="text"
        onChange={handleCardAttributeEdit}
        defaultValue={title}
      ></input>
      <div id="checklist-title-buttons" className="field is-grouped">
        <p className="control">
          <button className="button is-primary" type="submit">
            Save
          </button>
          <button
            className="button is-danger"
            onClick={handleHideChecklistTitleForm}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  )
}

export default ChecklistTitleForm