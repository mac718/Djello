import React from 'react'

const CardDescriptionForm = ({
  description,
  handleEditCardDescription,
  handleUpdateCardDescription,
  handleSwitchToCardDescriptionDisplay,
  listId,
  cardId,
}) => {
  return (
    <form
      className="card-description-form"
      onSubmit={handleUpdateCardDescription}
    >
      <textarea
        className="textarea"
        onChange={handleEditCardDescription}
        defaultValue={description}
      ></textarea>
      <div id="card-modal-buttons" className="field is-grouped">
        <p className="control">
          <button className="button is-primary" type="submit">
            Save
          </button>
          <button
            className="button is-danger"
            onClick={handleSwitchToCardDescriptionDisplay}
          >
            Cancel
          </button>
        </p>
      </div>
    </form>
  )
}

export default CardDescriptionForm
