import React from 'react'

const CardDescriptionForm = ({
  description,
  handleCardDescriptionEdit,
  handleCardDescriptionUpdate,
  handleSwitchToCardDescriptionDisplay,
  listId,
  cardId,
}) => {
  return (
    <form onSubmit={handleCardDescriptionUpdate}>
      <textarea
        className="textarea"
        onChange={handleCardDescriptionEdit}
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
