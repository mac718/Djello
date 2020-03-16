import React from 'react'

const CardModal = ({
  title,
  description,
  members,
  classes,
  handleActiveCardModal,
  cardId,
  handleDeleteCard,
  listId,
  listName,
}) => {
  console.log('listId ' + listId)
  console.log('carId ' + cardId)
  return (
    <div id={cardId} className={classes}>
      <span id={listId}></span>
      <div className="modal-background"></div>
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <p>In list {listName}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleActiveCardModal}
          ></button>
        </div>
        <div className="modal-card-body">
          <button
            className="button is-primary is-light"
            onClick={handleDeleteCard}
          >
            Mark as Complete
          </button>
          <form>
            <textarea
              className="textarea"
              defaultValue={description}
            ></textarea>
            <div className="members">
              <p className="is-size-4">Members</p>
            </div>
            <div className="modal-card-footer">
              <p className="is-size-4">Activity</p>
            </div>
            <div id="card-modal-buttons" className="field is-grouped">
              <p className="control">
                <button className="button is-primary" type="submit">
                  Save
                </button>
                <button className="button is-danger">Cancel</button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CardModal
