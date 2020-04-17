import React from 'react'

const ChecklistTitleDisplay = ({
  title,
  handleDisplayChecklistTitleForm,
  handleDeleteChecklist,
}) => {
  return (
    <div
      className="checklist-title-display"
      onClick={handleDisplayChecklistTitleForm}
    >
      <p className="checklist-title">{title}</p>
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
