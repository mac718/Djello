import React from 'react'

const ChecklistTitleDisplay = ({
  title,
  handleDisplayChecklistTitleForm,
  handleDeleteChecklist,
  checklistId,
}) => {
  console.log(checklistId)
  return (
    <div
      className="checklist-title-display"
      onClick={() => handleDisplayChecklistTitleForm(checklistId)}
    >
      <p
        className="checklist-title"
        onClick={() => handleDisplayChecklistTitleForm(checklistId)}
      >
        {title}
      </p>
      <div className="delete-checklist">
        <button
          className="button is-small is-danger is-light"
          onClick={handleDeleteChecklist}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default ChecklistTitleDisplay
