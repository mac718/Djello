import React from 'react'

const CardDescriptionForm = ({
  description,
  handleCardAttributeEdit,
  handleCardAttributeUpdate,
  handleSwitchToCardDescriptionDisplay,
  listId,
  cardId,
}) => {
  return (
    <form
      className="card-description-form"
      onSubmit={handleCardAttributeUpdate}
    >
      <textarea
        className="textarea"
        onChange={handleCardAttributeEdit}
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
