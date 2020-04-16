import React from 'react'

const ChecklistTitleDisplay = ({ title, handleDisplayChecklistTitleForm }) => {
  return (
    <div
      className="checklist-title-display"
      onClick={handleDisplayChecklistTitleForm}
    >
      {title}
      <div className="delete-checklist">
        <button className="button">delete</button>
      </div>
    </div>
  )
}

export default ChecklistTitleDisplay
