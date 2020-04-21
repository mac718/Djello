import React from 'react'

const CardTitleForm = ({
  title,
  handleEditCardTitle,
  handleUpdateCardTitle,
  handleSwitchToCardTitleDisplay,
  listId,
  cardId,
}) => {
  return (
    <form onSubmit={handleUpdateCardTitle}>
      <input
        className="input"
        type="text"
        onChange={handleEditCardTitle}
        defaultValue={title}
      ></input>
      <div id="card-modal-buttons" className="field is-grouped">
        <p className="control">
          <button className="button is-primary" type="submit">
            Save
          </button>
          <button
            className="button is-danger"
            onClick={handleSwitchToCardTitleDisplay}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  )
}

export default CardTitleForm
