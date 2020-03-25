import React from 'react'

const CardTitleForm = ({
  title,
  handleCardTitleEdit,
  handleCardTitleUpdate,
  handleSwitchToCardTitleDisplay,
  listId,
  cardId,
}) => {
  return (
    <form onSubmit={handleCardTitleUpdate}>
      <textarea
        className="textarea"
        onChange={handleCardTitleEdit}
        defaultValue={title}
      ></textarea>
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
